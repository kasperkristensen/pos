import { Router } from "express";
import middlewares from "../../middlewares";

const route = Router();

export default (app: Router): Router => {
  app.use("/payments", route);

  route.get(
    "/connection-token",
    middlewares.wrap(require("./connection-token").default)
  );

  return app;
};
