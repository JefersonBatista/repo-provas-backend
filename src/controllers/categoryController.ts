import { Request, Response } from "express";

import categoryService from "../services/categoryService.js";

async function getAll(req: Request, res: Response) {
  const categories = await categoryService.getAll();
  res.send(categories);
}

export default { getAll };
