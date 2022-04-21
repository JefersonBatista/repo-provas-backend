import { Request, Response } from "express";

import userService from "../services/userService.js";
import { CreateUserData } from "../repositories/userRepository.js";

async function create(req: Request, res: Response) {
  const data: CreateUserData = req.body;

  await userService.create(data);

  res.sendStatus(201);
}

export default {
  create,
};
