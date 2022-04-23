import { Router } from "express";

import testController from "../controllers/testController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const testRouter = Router();

testRouter.get(
  "/tests-by-disciplines",
  validateToken,
  testController.getByDisciplines
);

testRouter.get(
  "/tests-by-teachers",
  validateToken,
  testController.getByTeachers
);

export default testRouter;
