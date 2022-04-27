import { Request, Response } from "express";

import { CreateTestData } from "../repositories/testRepository.js";
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

async function create(req: Request, res: Response) {
  const data = req.body as CreateTestData;
  await testService.create(data);
  res.sendStatus(201);
}

export default { getByDisciplines, getByTeachers, incrementViewCount, create };
