import { Router } from "express";

import authController from "../controllers/authController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post(
  "/auth/login",
  validateSchema(userSchema),
  authController.login
);

export default authRouter;
