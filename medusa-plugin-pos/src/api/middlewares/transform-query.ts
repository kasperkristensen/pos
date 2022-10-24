import { BaseEntity } from "@medusajs/medusa";
import {
  FindConfig,
  QueryConfig,
  RequestQueryFields,
} from "@medusajs/medusa/dist/types/common";
import { ClassConstructor } from "class-transformer";
import { ValidatorOptions } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import {
  prepareListQuery,
  prepareRetrieveQuery,
} from "../../utils/get-query-config";
import { removeUndefinedProperties } from "../../utils/remove-undefined-properties";
import { validator } from "../../utils/validator";
import normalizeQuery from "./normalize-query";

export function transformQuery<
  T extends RequestQueryFields,
  TEntity extends BaseEntity
>(
  plainToClass: ClassConstructor<T>,
  queryConfig?: QueryConfig<TEntity>,
  config: ValidatorOptions = {}
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      normalizeQuery()(req, res, () => void 0);
      const validated: T = await validator<T, Record<string, unknown>>(
        plainToClass,
        req.query,
        config
      );
      req.validatedQuery = validated;

      req.filterableFields = omit(validated, [
        "limit",
        "offset",
        "expand",
        "fields",
        "order",
      ]);
      req.filterableFields = removeUndefinedProperties(req.filterableFields);

      if (queryConfig?.isList) {
        req.listConfig = prepareListQuery(
          validated,
          queryConfig
        ) as FindConfig<unknown>;
      } else {
        req.retrieveConfig = prepareRetrieveQuery(
          validated,
          queryConfig
        ) as FindConfig<unknown>;
      }

      next();
    } catch (e) {
      next(e);
    }
  };
}
