"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _antd = require("antd");

var _utils = require("../utils");

var _OriginSearch = _interopRequireDefault(require("./OriginSearch"));

var _FileUpload = _interopRequireDefault(require("./FileUpload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FormItem = _antd.Form.Item;
var Option = _antd.Select.Option;
var RadioGroup = _antd.Radio.Group;
var RangePicker = _antd.DatePicker.RangePicker;
var TextArea = _antd.Input.TextArea;
var CheckboxGroup = _antd.Checkbox.Group;

var defaultAction = function defaultAction() {};

var isUndefind = function isUndefind(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
};

var handleDisabledDate = function handleDisabledDate(currentDate) {
  return currentDate && currentDate > (0, _moment.default)().endOf('day');
};
/**
 * @param string formItemLayout         : 表单项整体样式定义
 * @param string getFieldDecorator      : 表单项装饰器
 * @param string require                : 表单项整体定义是否必填
 * filed 参数说明
 * @param string type         : 表单项类型
 * @param string key          : 表单项主键
 * @param string name         : 表单项名称
 * @param string required     : 表单项是否必填
 * @param string allowClear   : 表单项是否允许清除
 * @param string placeholder  : 表单项说明文字
 * @param string defaultValue : 表单项默认值
 * @param string disable      : 表单项是否禁用
 * @param string rules        : 表单项校验规则
 * @param string maxLength    : 表单项最大长度
 * @param string isEnable     : 表单项是否启用，true时渲染，false时不渲染
 * @param string specialKey   : 表单项FORMITEM专用key值，用于react diff时用
 * @param string format         : 表单项类型
*/


function _default(_ref) {
  var _ref$formItemLayout = _ref.formItemLayout,
      formItemLayout = _ref$formItemLayout === void 0 ? _utils.formItemLayout : _ref$formItemLayout,
      getFieldDecorator = _ref.getFieldDecorator,
      require = _ref.require;
  return function FormRender(props) {
    var field = props.field,
        _props$data = props.data,
        data = _props$data === void 0 ? {} : _props$data;
    var _field$type = field.type,
        type = _field$type === void 0 ? 'input' : _field$type,
        key = field.key,
        name = field.name,
        _field$required = field.required,
        required = _field$required === void 0 ? require || false : _field$required,
        _field$allowClear = field.allowClear,
        allowClear = _field$allowClear === void 0 ? true : _field$allowClear,
        placeholder = field.placeholder,
        defaultValue = field.defaultValue,
        _field$disable = field.disable,
        disable = _field$disable === void 0 ? false : _field$disable,
        _field$rules = field.rules,
        rules = _field$rules === void 0 ? [] : _field$rules,
        maxLength = field.maxLength,
        _field$isEnable = field.isEnable,
        isEnable = _field$isEnable === void 0 ? true : _field$isEnable,
        specialKey = field.specialKey,
        _field$onChange = field.onChange,
        onChange = _field$onChange === void 0 ? defaultAction : _field$onChange,
        format = field.format;
    var content = null;

    switch (type) {
      // eslint-disable-next-line
      case 'input':
        // eslint-disable-next-line
        var patternRules = [{
          required: required,
          message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
        }, {
          pattern: /^\S.*\S$|^\S$/,
          message: '首尾不能含有空字符'
        }].concat(rules);
        content = (props.isEnable || isEnable) && _react.default.createElement(FormItem, _extends({
          key: specialKey || key,
          label: name
        }, formItemLayout, {
          className: "self-define-item"
        }), getFieldDecorator(key, {
          initialValue: data[key],
          rules: patternRules
        })(_react.default.createElement(_antd.Input, {
          type: "text",
          maxLength: maxLength,
          onChange: props.onChange || onChange,
          placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(name),
          disabled: disable && disable(data)
        })));
        break;
      // eslint-disable-next-line

      case 'inputNumber':
        // min 设计了默认值的话，会导致表单为非必填时，会默认填上最小值；
        // eslint-disable-next-line
        var max = field.max,
            min = field.min,
            _field$precision = field.precision,
            precision = _field$precision === void 0 ? 0 : _field$precision,
            _field$step = field.step,
            step = _field$step === void 0 ? 1 : _field$step;
        content = (props.isEnable || isEnable) && _react.default.createElement(FormItem, _extends({
          key: specialKey || key,
          label: name
        }, formItemLayout, {
          className: "self-define-item"
        }), getFieldDecorator(key, {
          initialValue: data[key],
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
          }].concat(rules)
        })(_react.default.createElement(_antd.InputNumber, {
          max: max,
          min: min,
          step: step,
          precision: precision,
          style: {
            width: '100%'
          },
          placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(name),
          onChange: props.onChange || onChange,
          disabled: disable && disable(data)
        })));
        break;
      // eslint-disable-next-line

      case 'text':
        // eslint-disable-next-line
        var _field$minRows = field.minRows,
            minRows = _field$minRows === void 0 ? 2 : _field$minRows,
            _field$maxRows = field.maxRows,
            maxRows = _field$maxRows === void 0 ? 6 : _field$maxRows;
        content = (props.isEnable || isEnable) && _react.default.createElement(FormItem, _extends({
          key: specialKey || key,
          label: name
        }, formItemLayout, {
          className: "self-define-item"
        }), getFieldDecorator(key, {
          initialValue: data[key],
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
          }].concat(rules)
        })(_react.default.createElement(TextArea, {
          type: "text",
          maxLength: maxLength || 300,
          placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(name),
          autosize: {
            minRows: minRows,
            maxRows: maxRows
          },
          onChange: props.onChange || onChange,
          disabled: disable && disable(data)
        })));
        break;
      // eslint-disable-next-line

      case 'origin':
        // eslint-disable-next-line
        var service = field.service,
            searchKey = field.searchKey,
            onSelect = field.onSelect;
        content = (props.isEnable || isEnable) && _react.default.createElement(FormItem, _extends({
          key: specialKey || key,
          label: name
        }, formItemLayout, {
          className: "self-define-item"
        }), getFieldDecorator(key, {
          initialValue: data[key],
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
          }].concat(rules)
        })(_react.default.createElement(_OriginSearch.default, {
          disabled: disable && disable(data),
          style: {
            width: '100%',
            height: 32
          },
          searchKey: searchKey,
          onSelect: props.onChange || onSelect,
          format: format,
          fetchData: service
        })));
        break;
      // eslint-disable-next-line

      case 'select':
        // eslint-disable-next-line
        var related = field.related,
            relatedKey = field.relatedKey,
            _field$enums = field.enums,
            enums = _field$enums === void 0 ? [] : _field$enums;
        content = (!related || typeof data[relatedKey] !== 'undefined') && _react.default.createElement(FormItem, _extends({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(key, {
          initialValue: isUndefind(data[key], defaultValue),
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
          }].concat(rules)
        })(_react.default.createElement(_antd.Select, {
          style: {
            width: '100%'
          },
          placeholder: placeholder || '不限',
          allowClear: allowClear,
          disabled: disable && disable(data),
          onChange: props.onChange || onChange
        }, (props.enums || enums).map(function (_ref2) {
          var value = _ref2.value,
              label = _ref2.label;
          return _react.default.createElement(Option, {
            key: value,
            value: value
          }, label);
        }))));
        break;
      // eslint-disable-next-line

      case 'radio':
        // eslint-disable-next-line
        var _field$enums2 = field.enums,
            options = _field$enums2 === void 0 ? [] : _field$enums2,
            _field$onChange2 = field.onChange,
            change = _field$onChange2 === void 0 ? function () {} : _field$onChange2;
        content = (props.isEnable || isEnable) && _react.default.createElement(FormItem, _extends({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(key, {
          initialValue: isUndefind(data[key], defaultValue),
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
          }].concat(rules)
        })(_react.default.createElement(RadioGroup, {
          options: props.enums || options,
          disabled: disable && disable(data),
          onSelect: props.onChange || onChange
        })));
        break;
      // eslint-disable-next-line

      case 'check':
        // eslint-disable-next-line
        var _field$enums3 = field.enums,
            groups = _field$enums3 === void 0 ? [] : _field$enums3;
        content = (props.isEnable || isEnable) && _react.default.createElement(FormItem, _extends({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(key, {
          initialValue: isUndefind(data[key], defaultValue),
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
          }].concat(rules)
        })(_react.default.createElement(CheckboxGroup, {
          options: props.enums || groups,
          disabled: disable && disable(data),
          onChange: props.onChange || onChange
        })));
        break;

      case 'datePicker':
        content = (props.isEnable || isEnable) && _react.default.createElement(FormItem, _extends({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(key, {
          initialValue: data[key] && (0, _moment.default)(data[key]),
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
          }].concat(rules)
        })(_react.default.createElement(_antd.DatePicker, {
          showTime: field.showTime || false,
          format: format || _utils.DATE_FORMAT,
          placeholder: placeholder || '请选择',
          disabled: disable && disable(data)
        })));
        break;
      // eslint-disable-next-line

      case 'rangePicker':
        // eslint-disable-next-line
        var startKey = field.startKey,
            endKey = field.endKey,
            rangeKey = field.key,
            _field$disabledDate = field.disabledDate,
            disabledDate = _field$disabledDate === void 0 ? false : _field$disabledDate,
            _field$showTime = field.showTime,
            showTime = _field$showTime === void 0 ? false : _field$showTime; // eslint-disable-next-line

        var beginDate = data[startKey]; // eslint-disable-next-line

        var endDate = data[endKey]; // eslint-disable-next-line

        var rangeDate = beginDate && endDate ? [(0, _moment.default)(beginDate), (0, _moment.default)(endDate)] : [];
        content = (props.isEnable || isEnable) && _react.default.createElement(FormItem, _extends({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(rangeKey, {
          initialValue: rangeDate,
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
          }].concat(rules)
        })(_react.default.createElement(RangePicker, {
          style: {
            width: '100%'
          },
          allowClear: allowClear,
          showTime: showTime,
          className: "search-range-picker",
          format: format || (showTime ? _utils.DATE_TIME_FORMAT : _utils.DATE_FORMAT),
          disabledDate: disabledDate ? function (currentDate) {
            return handleDisabledDate(currentDate);
          } : undefined
        })));
        break;

      case 'image':
      case 'imageUpload':
        content = (props.isEnable || isEnable) && _react.default.createElement(FormItem, _extends({
          className: "image-upload",
          key: key,
          label: name
        }, formItemLayout), getFieldDecorator(key, {
          initialValue: data[key],
          rules: [{
            required: props.required || required,
            message: placeholder || "\u8BF7\u4E0A\u4F20".concat(name)
          }]
        })(_react.default.createElement(_FileUpload.default, {
          info: field.info,
          simple: field.psimple,
          key: key,
          listType: field.listType,
          reg: field.reg,
          fileSize: field.fileSize,
          tips: field.tips,
          upload: field.upload,
          maxSize: field.maxSize
        })));
        break;

      case 'render':
        content = field.rander(getFieldDecorator, data);
        break;

      default:
        break;
    }

    return content;
  };
}