import { Router } from "express";
import middlewares from "../../middlewares";

const route = Router();

export default (app: Router): Router => {
  app.use("/payments", route);

  route.get(
    "/connection-token",
    middlewares.wrap(require("./connection-token").default)
  );

  route.post(
    "/update-intent/:paymentIntent",
    middlewares.wrap(require("./update-payment-method-type").default)
  );

  return app;
};
