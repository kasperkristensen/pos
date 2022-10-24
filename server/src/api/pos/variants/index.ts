import { Router } from "express";
import middlewares from "../../middlewares";

const route = Router();

export default (app: Router): Router => {
  app.use("/variants", route);

  route.get("/:barcode", middlewares.wrap(require("./retrieve").default));

  route.get(
    "/:barcode/inventory",
    middlewares.wrap(require("./inventory").default)
  );

  return app;
};
