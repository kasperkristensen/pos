import { IsOptional, IsString } from "class-validator";
import { Request, Response } from "express";
import BarcodeService from "../../../services/barcode";

export default async (req: Request, res: Response) => {
  const { barcode } = req.params;

  const barcodeService: BarcodeService = req.scope.resolve("barcodeService");

  const variant = await barcodeService.retrieveByBarcode(barcode as string);

  return res.json({ variant });
};

export class POSGetVariant {
  @IsString()
  barcode: string;

  @IsString()
  @IsOptional()
  type: string;
}
