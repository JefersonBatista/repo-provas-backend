import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../src/app";
import prisma from "../src/database";
import { invalidUserFactory, userFactory } from "./factories/userFactory";

describe("POST /auth/login", () => {
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

  it("given a non-existent email, status should be 404 and token isn't returned", async () => {
    const user = userFactory();
    const login = { email: faker.internet.email(), password: user.password };

    await supertest(app).post("/users").send(user);
    const response = await supertest(app).post("/auth/login").send(login);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({});
  });
  it("given an incorrect password, status should be 401 and token isn't returned", async () => {
    const user = userFactory();
    const login = { email: user.email, password: faker.internet.password() };

    await supertest(app).post("/users").send(user);
    const response = await supertest(app).post("/auth/login").send(login);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({});
  });

  it("given a valid login, status should be 200 and token is returned", async () => {
    const user = userFactory();
    const login = user;

    await supertest(app).post("/users").send(user);
    const response = await supertest(app).post("/auth/login").send(login);

    expect(response.status).toBe(200);
    expect(typeof response.body.token).toBe("string");
  });
});
