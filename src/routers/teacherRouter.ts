import { Router } from "express";
import teacherController from "../controllers/teacherController";

import validateToken from "../middlewares/tokenValidationMiddleware";

const teacherRouter = Router();
teacherRouter.use(validateToken);

teacherRouter.get(
  "/disciplines/:id/teachers",
  teacherController.getByDisciplineId
);

export default teacherController;
