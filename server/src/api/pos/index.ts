import { Router } from "express";
import paymentsRoutes from "./payments";
import variantsRoutes from "./variants";

const route = Router();

export default (app: Router): Router => {
  app.use("/pos", route);

  variantsRoutes(route);
  paymentsRoutes(route);

  return app;
};
