import { Request, Response } from "express";
import { stripe } from "../../../constants/stripe";

export default async (req: Request, res: Response) => {
  const { payment_intent_id } = req.body;
  const response = await stripe.paymentIntents.capture(payment_intent_id);

  res.json({ response });
};
