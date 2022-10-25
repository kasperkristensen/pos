import Stripe from "stripe"
import { TransactionBaseService } from "@medusajs/medusa";
import { Logger } from "@medusajs/medusa/dist/types/global";
import { EntityManager } from "typeorm";

class StripePosService extends TransactionBaseService{
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager;
  protected logger_: Logger
  protected stripe_: Stripe

  constructor({logger}) {
    super(arguments[0])

    this.logger_ = logger

    // ts-ignore
    this.stripe_ = Stripe(process.env.STRIPE_API_KEY)

  }


  async setPaymentType(id: string){
    this.logger_.info('updating payment types')

    const paymentIntent = await this.stripe_.paymentIntents.update(
      id,
      {payment_method_types: ["card_present"], capture_method: 'automatic'}
    );

    this.logger_.info(JSON.stringify(paymentIntent))

    return paymentIntent
  }
}

export default StripePosService