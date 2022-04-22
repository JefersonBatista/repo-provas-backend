import { Router } from "express";

import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import testRouter from "./testRouter.js";

const routes = Router();

routes.use(userRouter);
routes.use(authRouter);
routes.use(testRouter);

export default routes;
