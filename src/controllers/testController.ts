import { Request, Response } from "express";

import testService from "../services/testService.js";

async function getByDiscipline(req: Request, res: Response) {
  const tests = await testService.getByDiscipline();
  res.send(tests);
}

export default { getByDiscipline };
