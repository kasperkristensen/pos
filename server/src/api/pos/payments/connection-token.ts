import { Request, Response } from "express";
import { stripe } from "../../../constants/stripe";

export default async (req: Request, res: Response) => {
  const connectionToken = await stripe.terminal.connectionTokens.create();

  return res.json({ secret: connectionToken.secret });
};
