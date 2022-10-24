import { Router } from "express";
import routes from "./pos";

export default (_rootDirectory: string): Router => {
  const app = Router();

  routes(app);

  return app;
};
