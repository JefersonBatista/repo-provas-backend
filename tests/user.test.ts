import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../src/app";
import prisma from "../src/database";
import { invalidUserFactory, userFactory } from "./factories/userFactory";

describe("POST /users", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("given an invalid user, status should be 400 and user isn't created", async () => {
    const invalidUser = invalidUserFactory();

    const response = await supertest(app).post("/users").send(invalidUser);
    const users = await prisma.user.findMany({});

    expect(response.status).toBe(400);
    expect(users.length).toBe(0);
  });

  it("given a valid user, status should be 201 and user is created", async () => {
    const user = userFactory();
    const email = user.email;

    const response = await supertest(app).post("/users").send(user);
    const users = await prisma.user.findMany({ where: { email } });

    expect(response.status).toBe(201);
    expect(users.length).toBe(1);
  });

  it("given user with same email, status should be 409, and second user isn't created", async () => {
    const user = userFactory();
    const email = user.email;
    const password = faker.datatype.string();

    await supertest(app).post("/users").send(user);
    const response = await supertest(app)
      .post("/users")
      .send({ email, password });
    const users = await prisma.user.findMany({ where: { email } });

    expect(response.status).toBe(409);
    expect(users.length).toBe(1);
  });
});
