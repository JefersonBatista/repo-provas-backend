import { Router } from "express";

const routes = Router();

routes.get("/hello", (_, res) => res.send("hello"));

export default routes;
