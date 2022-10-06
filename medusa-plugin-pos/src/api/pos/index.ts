import { Router } from "express";
import variantRoutes from "./variants";

const route = Router();

export default (app: Router): Router => {
  app.use("/pos", route);

  variantRoutes(route);

  return app;
};
