function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React, { Children, cloneElement, useMemo, useRef, forwardRef, useEffect } from 'react';
import { Form } from 'antd';
import { formItemLayout as layout } from '../utils';
import FormRender from './FormRender';
import { extendSymbol, WrapperDefault } from './default';
var useForm = Form.useForm; // 遍历 react children, 识别FormRender

function deepMap(children, extendProps, mapFields) {
  return Children.map(children, function (child) {
    if (child === null || _typeof(child) !== 'object') {
      return child;
    }

    var _child$props = child.props,
        itemKey = _child$props.itemKey,
        field = _child$props.field;
    var isDefine = typeof child.type === 'function'; // 仅对FormRender 组件做属性扩展

    if (isDefine && child.type.$type === extendSymbol) {
      return /*#__PURE__*/cloneElement(child, Object.assign(Object.assign({}, extendProps), {
        field: field || mapFields[itemKey]
      }));
    }

    if (child && child.props && child.props.children && _typeof(child.props.children) === 'object') {
      // Clone the child that has children and map them too
      return /*#__PURE__*/cloneElement(child, {
        children: deepMap(child.props.children, extendProps, mapFields)
      });
    }

    return child;
  });
}

var FormGroup = function FormGroup(props, ref) {
  var _props$formItemLayout = props.formItemLayout,
      formItemLayout = _props$formItemLayout === void 0 ? layout : _props$formItemLayout,
      containerName = props.containerName,
      required = props.required,
      _props$fields = props.fields,
      fields = _props$fields === void 0 ? [] : _props$fields,
      _props$Wrapper = props.Wrapper,
      Wrapper = _props$Wrapper === void 0 ? WrapperDefault : _props$Wrapper,
      withWrap = props.withWrap,
      dynamicParams = props.dynamicParams,
      children = props.children,
      _props$datas = props.datas,
      datas = _props$datas === void 0 ? {} : _props$datas,
      others = __rest(props, ["formItemLayout", "containerName", "required", "fields", "Wrapper", "withWrap", "dynamicParams", "children", "datas"]);

  var insideRef = useRef();
  var mapFields = useMemo(function () {
    return fields.reduce(function (pre, cur) {
      var key = cur.key;

      if (!key) {
        console.log('field key is requied');
        return pre;
      }

      pre[key] = cur;
      return pre;
    }, {});
  }, [fields]);

  var _ref = ref || insideRef;

  var extendProps = {
    containerName: containerName,
    dynamicParams: dynamicParams,
    datas: datas,
    required: required,
    Wrapper: Wrapper,
    withWrap: withWrap
  };
  var formProps = Object.assign(Object.assign({
    initialValues: datas
  }, formItemLayout), others); // 如果data 值变化，重置表单的值

  useEffect(function () {
    // 函数式组件采用form 直接reset；
    if (props.form) {
      props.form.setFieldsValue(datas);
      return;
    } // 如果是类组件，才采用ref示例更新组件


    if (_typeof(_ref) === 'object') {
      _ref.current.setFieldsValue(datas);
    }
  }, [datas]);
  return /*#__PURE__*/React.createElement(Form, Object.assign({}, formProps, {
    ref: _ref
  }), deepMap(children, extendProps, mapFields));
};

var FormGroupWithRef = /*#__PURE__*/forwardRef(FormGroup);
var ForwardForm = FormGroupWithRef;
ForwardForm.FormRender = FormRender;
ForwardForm.useForm = useForm;
export default ForwardForm;