"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUndefinedProperties = removeUndefinedProperties;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _isDefined = require("./is-defined");

function removeUndefinedProperties(inputObj) {
  var removeProperties = function removeProperties(obj) {
    var res = {};
    Object.keys(obj).reduce(function (acc, key) {
      if (typeof obj[key] === "undefined") {
        return acc;
      }

      acc[key] = removeUndefinedDeeply(obj[key]);
      return acc;
    }, res);
    return res;
  };

  return removeProperties(inputObj);
}

function removeUndefinedDeeply(input) {
  if ((0, _isDefined.isDefined)(input)) {
    if (input === null || input === "null") {
      return null;
    } else if (Array.isArray(input)) {
      return input.map(function (item) {
        return removeUndefinedDeeply(item);
      }).filter(function (v) {
        return (0, _isDefined.isDefined)(v);
      });
    } else if (Object.prototype.toString.call(input) === "[object Date]") {
      return input;
    } else if ((0, _typeof2["default"])(input) === "object") {
      return Object.keys(input).reduce(function (acc, key) {
        if (typeof input[key] === "undefined") {
          return acc;
        }

        acc[key] = removeUndefinedDeeply(input[key]);
        return acc;
      }, {});
    } else {
      return input;
    }
  }
}