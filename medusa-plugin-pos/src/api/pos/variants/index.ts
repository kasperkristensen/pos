import { Router } from "express";
import middlewares from "../../middlewares";

const route = Router();

export default (app: Router): Router => {
  app.use("/variants", route);

  route.get(
    "/barcode/:barcode",
    middlewares.wrap(require("./retrieve-by-barcode").default)
  );

  return app;
};
