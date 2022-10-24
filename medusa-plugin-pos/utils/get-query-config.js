"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListConfig = getListConfig;
exports.getRetrieveConfig = getRetrieveConfig;
exports.pickByConfig = pickByConfig;
exports.prepareListQuery = prepareListQuery;
exports.prepareRetrieveQuery = prepareRetrieveQuery;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = require("lodash");

var _dist = require("medusa-core-utils/dist");

var _isDefined = require("./is-defined");

function pickByConfig(obj, config) {
  var _config$select, _config$relations;

  var fields = [].concat((0, _toConsumableArray2["default"])((_config$select = config.select) !== null && _config$select !== void 0 ? _config$select : []), (0, _toConsumableArray2["default"])((_config$relations = config.relations) !== null && _config$relations !== void 0 ? _config$relations : []));

  if (fields.length) {
    if (Array.isArray(obj)) {
      return obj.map(function (o) {
        return (0, _lodash.pick)(o, fields);
      });
    } else {
      return (0, _lodash.pick)(obj, fields);
    }
  }

  return obj;
}

function getRetrieveConfig(defaultFields, defaultRelations, fields, expand) {
  var includeFields = [];

  if ((0, _isDefined.isDefined)(fields)) {
    includeFields = Array.from(new Set([].concat((0, _toConsumableArray2["default"])(fields), ["id"]))).map(function (field) {
      return typeof field === "string" ? field.trim() : field;
    });
  }

  var expandFields = [];

  if ((0, _isDefined.isDefined)(expand)) {
    expandFields = expand.map(function (expandRelation) {
      return expandRelation.trim();
    });
  }

  return {
    select: includeFields.length ? includeFields : defaultFields,
    relations: expandFields.length ? expandFields : defaultRelations
  };
}

function getListConfig(defaultFields, defaultRelations, fields, expand) {
  var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;
  var offset = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var order = arguments.length > 6 ? arguments[6] : undefined;
  var includeFields = [];

  if ((0, _isDefined.isDefined)(fields)) {
    var fieldSet = new Set(fields); // Ensure created_at is included, since we are sorting on this

    fieldSet.add("created_at");
    fieldSet.add("id");
    includeFields = Array.from(fieldSet);
  }

  var expandFields = [];

  if ((0, _isDefined.isDefined)(expand)) {
    expandFields = expand;
  }

  var orderBy = order !== null && order !== void 0 ? order : {
    created_at: "DESC"
  };
  return {
    select: includeFields.length ? includeFields : defaultFields,
    relations: expandFields.length ? expandFields : defaultRelations,
    skip: offset,
    take: limit,
    order: orderBy
  };
}

function prepareListQuery(validated, queryConfig) {
  var _expandFields, _queryConfig$allowedF, _expandRelations, _queryConfig$allowedR, _queryConfig$defaultR;

  var order = validated.order,
      fields = validated.fields,
      expand = validated.expand,
      limit = validated.limit,
      offset = validated.offset;
  var expandRelations = undefined;

  if (expand) {
    expandRelations = expand.split(",");
  }

  var expandFields = undefined;

  if (fields) {
    expandFields = fields.split(",");
  }

  if ((_expandFields = expandFields) !== null && _expandFields !== void 0 && _expandFields.length && queryConfig !== null && queryConfig !== void 0 && (_queryConfig$allowedF = queryConfig.allowedFields) !== null && _queryConfig$allowedF !== void 0 && _queryConfig$allowedF.length) {
    validateFields(expandFields, queryConfig.allowedFields);
  }

  if ((_expandRelations = expandRelations) !== null && _expandRelations !== void 0 && _expandRelations.length && queryConfig !== null && queryConfig !== void 0 && (_queryConfig$allowedR = queryConfig.allowedRelations) !== null && _queryConfig$allowedR !== void 0 && _queryConfig$allowedR.length) {
    validateRelations(expandRelations, queryConfig.allowedRelations);
  }

  var orderBy;

  if ((0, _isDefined.isDefined)(order)) {
    var _queryConfig$allowedF2;

    var orderField = order;

    if (order.startsWith("-")) {
      var _order$split = order.split("-"),
          _order$split2 = (0, _slicedToArray2["default"])(_order$split, 2),
          field = _order$split2[1];

      orderField = field;
      orderBy = (0, _defineProperty2["default"])({}, field, "DESC");
    } else {
      orderBy = (0, _defineProperty2["default"])({}, order, "ASC");
    }

    if (queryConfig !== null && queryConfig !== void 0 && (_queryConfig$allowedF2 = queryConfig.allowedFields) !== null && _queryConfig$allowedF2 !== void 0 && _queryConfig$allowedF2.length && !(queryConfig !== null && queryConfig !== void 0 && queryConfig.allowedFields.includes(orderField))) {
      throw new _dist.MedusaError(_dist.MedusaError.Types.INVALID_DATA, "Order field ".concat(orderField, " is not valid"));
    }
  }

  return getListConfig(queryConfig === null || queryConfig === void 0 ? void 0 : queryConfig.defaultFields, (_queryConfig$defaultR = queryConfig === null || queryConfig === void 0 ? void 0 : queryConfig.defaultRelations) !== null && _queryConfig$defaultR !== void 0 ? _queryConfig$defaultR : [], expandFields, expandRelations, limit !== null && limit !== void 0 ? limit : queryConfig === null || queryConfig === void 0 ? void 0 : queryConfig.defaultLimit, offset !== null && offset !== void 0 ? offset : 0, orderBy);
}

function prepareRetrieveQuery(validated, queryConfig) {
  var _expandFields2, _queryConfig$allowedF3, _expandRelations2, _queryConfig$allowedR2, _queryConfig$defaultR2;

  var fields = validated.fields,
      expand = validated.expand;
  var expandRelations = [];

  if (expand) {
    expandRelations = expand.split(",");
  }

  var expandFields = undefined;

  if (fields) {
    expandFields = fields.split(",");
  }

  if ((_expandFields2 = expandFields) !== null && _expandFields2 !== void 0 && _expandFields2.length && queryConfig !== null && queryConfig !== void 0 && (_queryConfig$allowedF3 = queryConfig.allowedFields) !== null && _queryConfig$allowedF3 !== void 0 && _queryConfig$allowedF3.length) {
    validateFields(expandFields, queryConfig.allowedFields);
  }

  if ((_expandRelations2 = expandRelations) !== null && _expandRelations2 !== void 0 && _expandRelations2.length && queryConfig !== null && queryConfig !== void 0 && (_queryConfig$allowedR2 = queryConfig.allowedRelations) !== null && _queryConfig$allowedR2 !== void 0 && _queryConfig$allowedR2.length) {
    validateRelations(expandRelations, queryConfig.allowedRelations);
  }

  return getRetrieveConfig(queryConfig === null || queryConfig === void 0 ? void 0 : queryConfig.defaultFields, (_queryConfig$defaultR2 = queryConfig === null || queryConfig === void 0 ? void 0 : queryConfig.defaultRelations) !== null && _queryConfig$defaultR2 !== void 0 ? _queryConfig$defaultR2 : [], expandFields, expandRelations);
}

function validateRelations(relations, allowed) {
  var disallowedRelationsFound = [];
  relations === null || relations === void 0 ? void 0 : relations.forEach(function (field) {
    if (!allowed.includes(field)) {
      disallowedRelationsFound.push(field);
    }
  });

  if (disallowedRelationsFound.length) {
    throw new _dist.MedusaError(_dist.MedusaError.Types.INVALID_DATA, "Relations [".concat(disallowedRelationsFound.join(", "), "] are not valid"));
  }
}

function validateFields(fields, allowed) {
  var disallowedFieldsFound = [];
  fields === null || fields === void 0 ? void 0 : fields.forEach(function (field) {
    if (!allowed.includes(field)) {
      disallowedFieldsFound.push(field);
    }
  });

  if (disallowedFieldsFound.length) {
    throw new _dist.MedusaError(_dist.MedusaError.Types.INVALID_DATA, "Fields [".concat(disallowedFieldsFound.join(", "), "] are not valid"));
  }
}