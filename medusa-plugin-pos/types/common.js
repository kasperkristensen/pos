"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringComparisonOperator = exports.NumericalComparisonOperator = exports.EmptyQueryParams = exports.DateComparisonOperator = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _classTransformer = require("class-transformer");

var _classValidator = require("class-validator");

var _dateTransform = require("../utils/validators/date-transform");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _class3, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _class5, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

var EmptyQueryParams = /*#__PURE__*/(0, _createClass2["default"])(function EmptyQueryParams() {
  (0, _classCallCheck2["default"])(this, EmptyQueryParams);
});
exports.EmptyQueryParams = EmptyQueryParams;
var DateComparisonOperator = (_dec = (0, _classValidator.IsOptional)(), _dec2 = (0, _classValidator.IsDate)(), _dec3 = (0, _classTransformer.Transform)(_dateTransform.transformDate), _dec4 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec5 = (0, _classValidator.IsOptional)(), _dec6 = (0, _classValidator.IsDate)(), _dec7 = (0, _classTransformer.Transform)(_dateTransform.transformDate), _dec8 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec9 = (0, _classValidator.IsOptional)(), _dec10 = (0, _classValidator.IsDate)(), _dec11 = (0, _classTransformer.Transform)(_dateTransform.transformDate), _dec12 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec13 = (0, _classValidator.IsOptional)(), _dec14 = (0, _classValidator.IsDate)(), _dec15 = (0, _classTransformer.Transform)(_dateTransform.transformDate), _dec16 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), (_class = /*#__PURE__*/(0, _createClass2["default"])(function DateComparisonOperator() {
  (0, _classCallCheck2["default"])(this, DateComparisonOperator);
  (0, _initializerDefineProperty2["default"])(this, "lt", _descriptor, this);
  (0, _initializerDefineProperty2["default"])(this, "gt", _descriptor2, this);
  (0, _initializerDefineProperty2["default"])(this, "gte", _descriptor3, this);
  (0, _initializerDefineProperty2["default"])(this, "lte", _descriptor4, this);
}), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "lt", [_dec, _dec2, _dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "gt", [_dec5, _dec6, _dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "gte", [_dec9, _dec10, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "lte", [_dec13, _dec14, _dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class));
exports.DateComparisonOperator = DateComparisonOperator;
var StringComparisonOperator = (_dec17 = (0, _classValidator.IsString)(), _dec18 = (0, _classValidator.IsOptional)(), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _classValidator.IsString)(), _dec21 = (0, _classValidator.IsOptional)(), _dec22 = Reflect.metadata("design:type", String), _dec23 = (0, _classValidator.IsString)(), _dec24 = (0, _classValidator.IsOptional)(), _dec25 = Reflect.metadata("design:type", String), _dec26 = (0, _classValidator.IsString)(), _dec27 = (0, _classValidator.IsOptional)(), _dec28 = Reflect.metadata("design:type", String), (_class3 = /*#__PURE__*/(0, _createClass2["default"])(function StringComparisonOperator() {
  (0, _classCallCheck2["default"])(this, StringComparisonOperator);
  (0, _initializerDefineProperty2["default"])(this, "lt", _descriptor5, this);
  (0, _initializerDefineProperty2["default"])(this, "gt", _descriptor6, this);
  (0, _initializerDefineProperty2["default"])(this, "gte", _descriptor7, this);
  (0, _initializerDefineProperty2["default"])(this, "lte", _descriptor8, this);
}), (_descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class3.prototype, "lt", [_dec17, _dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class3.prototype, "gt", [_dec20, _dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2["default"])(_class3.prototype, "gte", [_dec23, _dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = (0, _applyDecoratedDescriptor2["default"])(_class3.prototype, "lte", [_dec26, _dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class3));
exports.StringComparisonOperator = StringComparisonOperator;
var NumericalComparisonOperator = (_dec29 = (0, _classValidator.IsNumber)(), _dec30 = (0, _classValidator.IsOptional)(), _dec31 = (0, _classTransformer.Type)(function () {
  return Number;
}), _dec32 = Reflect.metadata("design:type", Number), _dec33 = (0, _classValidator.IsNumber)(), _dec34 = (0, _classValidator.IsOptional)(), _dec35 = (0, _classTransformer.Type)(function () {
  return Number;
}), _dec36 = Reflect.metadata("design:type", Number), _dec37 = (0, _classValidator.IsNumber)(), _dec38 = (0, _classValidator.IsOptional)(), _dec39 = (0, _classTransformer.Type)(function () {
  return Number;
}), _dec40 = Reflect.metadata("design:type", Number), _dec41 = (0, _classValidator.IsNumber)(), _dec42 = (0, _classValidator.IsOptional)(), _dec43 = (0, _classTransformer.Type)(function () {
  return Number;
}), _dec44 = Reflect.metadata("design:type", Number), (_class5 = /*#__PURE__*/(0, _createClass2["default"])(function NumericalComparisonOperator() {
  (0, _classCallCheck2["default"])(this, NumericalComparisonOperator);
  (0, _initializerDefineProperty2["default"])(this, "lt", _descriptor9, this);
  (0, _initializerDefineProperty2["default"])(this, "gt", _descriptor10, this);
  (0, _initializerDefineProperty2["default"])(this, "gte", _descriptor11, this);
  (0, _initializerDefineProperty2["default"])(this, "lte", _descriptor12, this);
}), (_descriptor9 = (0, _applyDecoratedDescriptor2["default"])(_class5.prototype, "lt", [_dec29, _dec30, _dec31, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = (0, _applyDecoratedDescriptor2["default"])(_class5.prototype, "gt", [_dec33, _dec34, _dec35, _dec36], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = (0, _applyDecoratedDescriptor2["default"])(_class5.prototype, "gte", [_dec37, _dec38, _dec39, _dec40], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = (0, _applyDecoratedDescriptor2["default"])(_class5.prototype, "lte", [_dec41, _dec42, _dec43, _dec44], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5));
exports.NumericalComparisonOperator = NumericalComparisonOperator;