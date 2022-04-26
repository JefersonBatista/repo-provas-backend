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

async function incrementViewCount(req: Request, res: Response) {
  const id: number = +req.params.id;

  if (!id) {
    return res.status(400).send("O ID especificado é inválido");
  }

  await testService.incrementViewCountById(id);
  res.sendStatus(200);
}

export default { getByDisciplines, getByTeachers, incrementViewCount };
