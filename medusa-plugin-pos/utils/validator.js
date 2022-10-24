"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validator = validator;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classTransformer = require("class-transformer");

var _classValidator = require("class-validator");

var _medusaCoreUtils = require("medusa-core-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var reduceErrorMessages = function reduceErrorMessages(errs) {
  return errs.reduce(function (acc, next) {
    if (next.constraints) {
      for (var _i = 0, _Object$entries = Object.entries(next.constraints); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
            _ = _Object$entries$_i[0],
            msg = _Object$entries$_i[1];

        acc.push(msg);
      }
    }

    if (next.children) {
      acc.push.apply(acc, (0, _toConsumableArray2["default"])(reduceErrorMessages(next.children)));
    }

    return acc;
  }, []);
};

function validator(_x, _x2) {
  return _validator.apply(this, arguments);
}

function _validator() {
  _validator = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(typedClass, plain) {
    var config,
        toValidate,
        errors,
        errorMessages,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            toValidate = (0, _classTransformer.plainToInstance)(typedClass, plain); // @ts-ignore

            _context.next = 4;
            return (0, _classValidator.validate)(toValidate, _objectSpread({
              whitelist: true,
              forbidNonWhitelisted: true
            }, config));

          case 4:
            errors = _context.sent;
            errorMessages = reduceErrorMessages(errors);

            if (!(errors !== null && errors !== void 0 && errors.length)) {
              _context.next = 8;
              break;
            }

            throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_DATA, errorMessages.join(", "));

          case 8:
            return _context.abrupt("return", toValidate);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _validator.apply(this, arguments);
}