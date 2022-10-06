import { ProductVariantService } from "@medusajs/medusa";
import { IsOptional, IsString } from "class-validator";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const { barcode, type } = req.query;

  const productVariantService: ProductVariantService = req.scope.resolve(
    "productVariantService"
  );

  return res.json({ barcode, type });
};

export class POSGetVariant {
  @IsString()
  barcode: string;

  @IsString()
  @IsOptional()
  type: string;
}
