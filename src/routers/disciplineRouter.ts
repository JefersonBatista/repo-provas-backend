import { Router } from "express";
import disciplineController from "../controllers/disciplineController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const disciplineRouter = Router();
disciplineRouter.use(validateToken);

disciplineRouter.get("/disciplines", disciplineController.getAll);

export default disciplineRouter;
