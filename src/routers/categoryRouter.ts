import { Router } from "express";
import categoryController from "../controllers/categoryController";
import validateToken from "../middlewares/tokenValidationMiddleware";

const categoryRouter = Router();
categoryRouter.use(validateToken);

categoryRouter.get("/categories", categoryController.getAll);

export default categoryRouter;
