import { Request, Response } from "express";

import disciplineService from "../services/disciplineService.js";

async function getAll(req: Request, res: Response) {
  const disciplines = await disciplineService.getAll();
  res.send(disciplines);
}

export default { getAll };
