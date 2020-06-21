/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';
import { Input, InputNumber, Select, DatePicker, Radio, Checkbox } from 'antd';
import OriginSearch from '../OriginSearch';
import FileUpload from '../FileUpload';
import InputWithUnit from '../InputWithUnit';
import { CommonProps } from './interface';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const { Option } = Select;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const getContainer = className => () => className ? document.getElementsByClassName(className)[0] : document.body;
const generateOption = (enums = []) => {
  if (typeof enums !== 'object') {
    console.error('enums is not an object or array');
    return [];
  }
  return Array.isArray(enums) ? enums : Object.keys(enums).map(value => ({
    value,
    label: enums[value]
  }));
};
const handleDisabledDate = currentDate => currentDate && currentDate > moment().endOf('day');

function HInput<T extends CommonProps> ({ field }: T) {
  return <Input {...field} />
};

const HText = ({ field }) => {
  return (
    <TextArea
      {...field}
    />);
};

const HInputNumber = ({ field }) => {
  return (
    <InputNumber
      {...field}
    />);
};

const HSelect = ({ field, selectEnums, containerName }) => {
  return (
    <Select
      getPopupContainer={getContainer(containerName)}
      {...field}
    >
      {generateOption(selectEnums).map(({ value, label }) => (
        <Option key={value} value={value}>{label}</Option>
      ))}
    </Select>);
};

const HRadio = ({ field, selectEnums }) => {
  return (
    <RadioGroup
      options={generateOption(selectEnums)}
      {...field}
    />);
};

const HCheck = ({ field, selectEnums }) => {
  return (
    <CheckboxGroup
      options={generateOption(selectEnums)}
      {...field}
    />);
};

const HDatePicker = ({ field, containerName }) => {
  const { format, ...others } = field;
  return (
    <DatePicker
      format={format || DATE_FORMAT}
      getCalendarContainer={getContainer(containerName)}
      {...others}
    />);
};

const HRangePicker = ({ field, containerName }) => {
  const { disabledDate, showTime = false, format, ...others } = field;
  // // eslint-disable-next-line
  // const beginDate = data[startKey];
  // // eslint-disable-next-line
  // const endDate = data[endKey];
  // // eslint-disable-next-line
  // const rangeDate = beginDate && endDate ? [moment(beginDate), moment(endDate)] : [];
  return (
    <RangePicker
      showTime={showTime}
      getCalendarContainer={getContainer(containerName)}
      disabledDate={disabledDate ? currentDate => handleDisabledDate(currentDate) : undefined}
      format={format || (showTime ? DATE_TIME_FORMAT : DATE_FORMAT)}
      {...others}
    />);
};

const HInputWithUnit = ({ field }) => {
  const { inputProps, selectProps, defaultUnit, enums, ...others } = field;
  return (<InputWithUnit
    enums={enums}
    selectProps={selectProps}
    inputProps={inputProps}
    defaultUnit={defaultUnit}
    {...others}
  />);
};

const selfDefine = ({ field, data }) => field.child({ field, data });

const OriginInput = ({ field }) => {
  return (<OriginSearch
    {...field}
    style={{ width: '100%', height: 32 }}
  />);
};

const UploadFile = ({ field, props = {} }) => {
  return (<FileUpload
    {...field}
  />);
};

const renderType = {
  origin: OriginInput,
  image: UploadFile,
  // imageUpload: UploadFile,
  selfDefine,
  inputWithUnit: HInputWithUnit,
  text: HText,
  input: HInput,
  inputNumber: HInputNumber,
  select: HSelect,
  radio: HRadio,
  check: HCheck,
  datePicker: HDatePicker,
  rangePicker: HRangePicker
};

export const extendRenderTypes = (types = {}) => Object.assign(renderType, types);

export default renderType;
