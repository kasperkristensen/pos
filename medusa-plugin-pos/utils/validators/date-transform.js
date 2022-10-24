"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformDate = void 0;

var transformDate = function transformDate(_ref) {
  var value = _ref.value;
  return !isNaN(Date.parse(value)) ? new Date(value) : new Date(Number(value) * 1000);
};

exports.transformDate = transformDate;