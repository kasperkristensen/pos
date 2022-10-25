import { Request, Response } from "express";
import StripePosService from "../../../services/stripePos";

export default async (req: Request, res: Response) => {
  const { paymentIntent } = req.params;

  const barcodeService: StripePosService = req.scope.resolve("stripePosService")

  const status = await barcodeService.setPaymentType(paymentIntent as string);

  return res.json({ status });
};
