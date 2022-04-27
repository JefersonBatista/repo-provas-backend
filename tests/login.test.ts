import supertest from "supertest";

import app from "../src/app";
import prisma from "../src/database";
import { invalidUserFactory, userFactory } from "./factories/userFactory";

describe("POST /auth/login", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("given an invalid login, status should be 400 and token isn't returned", async () => {
    const user = userFactory();
    const invalidLogin = invalidUserFactory();

    await supertest(app).post("/users").send(user);
    const response = await supertest(app)
      .post("/auth/login")
      .send(invalidLogin);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  it("given a valid login, status should be 200 and token is returned", async () => {
    const user = userFactory();
    const login = user;

    await supertest(app).post("/users").send(user);
    const response = await supertest(app).post("/auth/login").send(login);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
