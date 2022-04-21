import { Router } from "express";

import userController from "../controllers/userController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/users", validateSchema(userSchema), userController.create);

export default userRouter;
