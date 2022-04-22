import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import userRepository, { LoginData } from "../repositories/userRepository.js";
import {
  emailNotUsedError,
  incorrectPasswordError,
} from "../utils/errorUtils.js";

async function login(data: LoginData) {
  const { email, password } = data;

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw emailNotUsedError();
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw incorrectPasswordError();
  }

  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign({ userId: user.id }, jwtSecret);

  return token;
}

export default { login };
