import { Router } from "express";

import testController from "../controllers/testController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const testRouter = Router();
testRouter.use(validateToken);

testRouter.get("/tests-by-disciplines", testController.getByDisciplines);

testRouter.get("/tests-by-teachers", testController.getByTeachers);

testRouter.patch(
  "/tests/:id/increment-view-count",
  testController.incrementViewCount
);

export default testRouter;
