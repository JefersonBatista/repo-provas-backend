import bcrypt from "bcrypt";

import userRepository, {
  CreateUserData,
} from "../repositories/userRepository.js";
import { emailAlreadyUsedError } from "../utils/errorUtils.js";

async function create(data: CreateUserData) {
  const { email, password } = data;

  await checkEmailIsAvailable(email);

  const hashedPassword = bcrypt.hashSync(password, 10);
  await userRepository.insert({ email, password: hashedPassword });
}

async function checkEmailIsAvailable(email: string) {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw emailAlreadyUsedError();
  }
}

export default { create };
