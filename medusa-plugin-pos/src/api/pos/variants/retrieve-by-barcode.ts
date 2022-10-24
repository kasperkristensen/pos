import { IsOptional, IsString } from "class-validator";
import { Request, Response } from "express";
import POSProductVariantService from "../../../services/pos-product-variant-service";
import { BarcodeType } from "../../../types/pos";

export default async (req: Request, res: Response) => {
  const { barcode, type } = req.query;

  const productVariantService: POSProductVariantService = req.scope.resolve(
    "posProductVariantService"
  );

  const variant = await productVariantService.retrieveByBarcode(
    barcode as string,
    type as BarcodeType
  );

  return res.json({ variant });
};

export class POSGetVariant {
  @IsString()
  barcode: string;

  @IsString()
  @IsOptional()
  type: string;
}
