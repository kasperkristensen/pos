import { IsOptional, IsString } from "class-validator";
import { Request, Response } from "express";
import BarcodeService from "../../../services/barcode";

export default async (req: Request, res: Response) => {
  const { barcode } = req.params;

  const barcodeService: BarcodeService = req.scope.resolve("barcodeService");

  const status = await barcodeService.getInventoryStatus(barcode as string);

  return res.json({ status });
};

export class POSGetVariant {
  @IsString()
  barcode: string;

  @IsString()
  @IsOptional()
  type: string;
}
