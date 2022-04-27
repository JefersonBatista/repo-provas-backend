import { Router } from "express";

import testController from "../controllers/testController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();
testRouter.use(validateToken);

testRouter.get("/tests-by-disciplines", testController.getByDisciplines);

testRouter.get("/tests-by-teachers", testController.getByTeachers);

testRouter.patch(
  "/tests/:id/increment-view-count",
  testController.incrementViewCount
);

testRouter.post("/tests", validateSchema(testSchema), testController.create);

export default testRouter;
