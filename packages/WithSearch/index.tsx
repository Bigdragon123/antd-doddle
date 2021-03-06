import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import moment, { Moment } from 'moment';
import { Pagination } from '../utils/common';
import { formItemLayout, FieldProps, SearchProps } from '../utils';
import FormGroup from '../FormGroup';
import { ConstuctorProps } from '../FormGroup/interface';
import './index.less';

const { FormRender } = FormGroup;

function DefaultRender(props) {
  const { fields, handleSearch, handleReset, getFieldDecorator, extraBtns, onReset } = props;
  return (
    <>
      <Row>
        {fields.map(field => (
          <Col span={8} key={field.key}>
            <FormRender {...{ field, getFieldDecorator }} />
          </Col>
        ))}
      </Row>
      <div className="btn-group">
        <Button type="primary" onClick={handleSearch}>查询</Button>
        {onReset && <Button onClick={handleReset}>重置</Button> /* 仅在设置onReset情况下，开启重置按钮 */}
        {extraBtns && extraBtns()}
      </div>
    </>
  );
}

interface WithSearchProps {
  form: any,
  onSearch: Function,
  fields?: FieldProps [],
  search?: SearchProps,
  onReset?: Function,
  paramFormat?: Function,
  pageName?: string,
  dynamicParams?: object,
  children?: (props: WithSearchProps, extendProps: ConstuctorProps) => React.ReactElement,
  extraBtns?: Function,
  [propName: string]: any
}

interface MomentArr {
  [index: number]: Moment
};

class WithSearch extends React.PureComponent<WithSearchProps> {
  formRender: React.ReactNode
  mapField: { _hasTimeRange: boolean }
  constructor(props) {
    super(props);
    this.state = {};
    const { fields = [] } = props;
    // this.formRender = formR({ getFieldDecorator, containerName: 'search-form' });
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getFormData = this.getFormData.bind(this);
    // 数组对象转hashMap
    this.mapField = fields.length ? fields.reduce((pre, cur) => {
      pre[cur.key] = cur;
      // 判断是否需要做时间转换；
      if (cur.startKey && cur.endKey) {
        pre[cur.key].isRangePicker = true;
        pre._hasTimeRange = true;
      }
      return pre;
    }, { _hasTimeRange: false }) : { _hasTimeRange: true };
  }
  getFormData(paramFormat) {
    const { form } = this.props;
    let data = {};
    form.validateFields((err, values) => {
      data = typeof paramFormat === 'function' ? paramFormat(values) : values;
    });
    return data;
  }
  handleSearch() {
    const { form, onSearch, pageName = Pagination.PN } = this.props;

    form.validateFields((err, values) => {
      if (err) return;
      const res = this.timeFormatFun(values);
      onSearch({
        ...res,
        [pageName]: 1
      });
    });
  }

  timeFormatFun(values) {
    const { timeFormat, paramFormat } = this.props;

    if (paramFormat) {
      return paramFormat(values);
    }

    // 如果没有时间选择项，直接返回
    if (!this.mapField._hasTimeRange) {
      return values;
    }

    // 如果没设置timeFormat，则不作格式化
    if (!timeFormat) {
      return values;
    }

    const keys = Object.keys(values);
    const transformFunc = typeof timeFormat === 'string' ?
      time => time.format(timeFormat) :
      time => time.valueOf();

    return keys.reduce((pre, cur) => {
      const value = pre[cur];
      const field = this.mapField[cur];
      // 搜索结果为数组，且数组的值为Moment对象
      if (field.isRangePicker) {
        if (Array.isArray(value) && (value as MomentArr)[0] instanceof moment) {
          const [start, end] = value;
          // 会根据showTIme 来判断是否需要自动去取一天的一头一尾
          pre[field.startKey] = field.showTime ? transformFunc(start) : transformFunc(start.startOf('day'));
          pre[field.endKey] = field.showTime ? transformFunc(end) : transformFunc(end.endOf('day'));
        } else {
          pre[field.startKey] = undefined;
          pre[field.endKey] = undefined;
        }

        delete pre[cur];
      }
      return pre;
    }, values);
  }

  handleReset() {
    const { onReset, form } = this.props;
    form.resetFields();
    onReset && onReset();
  }

  render() {
    const { children, form, fields, search, extraBtns, onReset, form: { getFieldDecorator }, dynamicParams = {}, required } = this.props;
    const childrenProps = {
      search,
      form,
      fields,
      onReset,
      extraBtns,
      formItemLayout,
      dynamicParams,
      onSearch: this.handleSearch,
      getFormData: this.getFormData,
      FormRender,
      handleSearch: this.handleSearch,
      handleReset: this.handleReset,
    };

    const extendProps = {
      containerName: 'search-form',
      dynamicParams,
      formItemLayout,
      getFieldDecorator,
      require: required,
      datas: search,
    };
    return (
      <div className="search-form">
        <FormGroup {...extendProps}>
          {children ? children(childrenProps, extendProps) : DefaultRender(childrenProps)}
        </FormGroup>
      </div>
    );
  }
}

export default Form.create()(WithSearch);

