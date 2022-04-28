import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const categoryRouter = Router();
categoryRouter.use(validateToken);

categoryRouter.get("/categories", categoryController.getAll);

export default categoryRouter;
