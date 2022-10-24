import { Request, Response } from "express";
import { stripe } from "../../../constants/stripe";

export default async (req: Request, res: Response) => {
  const intent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "eur",
    payment_method_types: ["card_present"],
    capture_method: "manual",
  });

  res.json({ intent });
};
