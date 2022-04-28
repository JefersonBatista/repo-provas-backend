import { Request, Response } from "express";

import teacherService from "../services/teacherService.js";

async function getByDisciplineId(req: Request, res: Response) {
  const disciplineId: number = +req.params.id;

  if (!disciplineId) {
    return res.status(400).send("O ID especificado é inválido");
  }

  const teachers = await teacherService.getByDisciplineId(disciplineId);
  res.send(teachers);
}

export default { getByDisciplineId };
