import { Request, Response } from "express";

import testService from "../services/testService.js";

async function getByDisciplines(req: Request, res: Response) {
  const tests = await testService.getByDisciplines();
  res.send(tests);
}

async function getByTeachers(req: Request, res: Response) {
  const tests = await testService.getByTeachers();
  res.send(tests);
}

export default { getByDisciplines, getByTeachers };
