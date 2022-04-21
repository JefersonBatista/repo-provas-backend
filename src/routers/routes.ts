import { Router } from "express";

import userRouter from "./userRouter.js";

const routes = Router();

routes.use(userRouter);

export default routes;
