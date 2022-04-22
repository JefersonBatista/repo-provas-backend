import { Request, Response } from "express";

import authService from "../services/authService.js";
import { LoginData } from "../repositories/userRepository.js";

async function login(req: Request, res: Response) {
  const loginData: LoginData = req.body;

  const token = await authService.login(loginData);

  res.send({ token });
}

export default { login };
