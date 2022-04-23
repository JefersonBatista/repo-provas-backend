import { Router } from "express";

import testController from "../controllers/testController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const testRouter = Router();

testRouter.get(
  "/tests-by-discipline",
  validateToken,
  testController.getByDiscipline
);

export default testRouter;
