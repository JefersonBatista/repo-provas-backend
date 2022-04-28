import { Router } from "express";

import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import testRouter from "./testRouter.js";
import categoryRouter from "./categoryRouter.js";
import disciplineRouter from "./disciplineRouter.js";
import teacherRouter from "./teacherRouter.js";

const routes = Router();

routes.use(userRouter);
routes.use(authRouter);
routes.use(testRouter);
routes.use(categoryRouter);
routes.use(disciplineRouter);
routes.use(teacherRouter);

export default routes;
