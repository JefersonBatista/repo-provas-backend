import { Router } from "express";
import disciplineController from "../controllers/disciplineController";
import validateToken from "../middlewares/tokenValidationMiddleware";

const disciplineRouter = Router();
disciplineRouter.use(validateToken);

disciplineRouter.get("/disciplines", disciplineController.getAll);

export default disciplineRouter;
