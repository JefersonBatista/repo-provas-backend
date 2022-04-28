import { Router } from "express";

import teacherController from "../controllers/teacherController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const teacherRouter = Router();
teacherRouter.use(validateToken);

teacherRouter.get(
  "/disciplines/:id/teachers",
  teacherController.getByDisciplineId
);

export default teacherRouter;
