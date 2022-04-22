import { User } from "@prisma/client";
import prisma from "../database.js";

export type CreateUserData = Omit<User, "id">;
export type LoginData = CreateUserData;

async function insert(data: CreateUserData) {
  await prisma.user.create({ data });
}

async function findByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export default { insert, findByEmail };
