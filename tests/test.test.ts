import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../src/app";
import prisma from "../src/database";
import { userFactory } from "./factories/userFactory";

describe("GET /tests-by-disciplines", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("for a user logged in, it should return status 200 and an object with the prop terms", async () => {
    const user = userFactory();

    await supertest(app).post("/users").send(user);
    const { body: bodyWithToken } = await supertest(app)
      .post("/auth/login")
      .send(user);

    const token = bodyWithToken.token;
    const response = await supertest(app)
      .get("/tests-by-disciplines")
      .set("Authorization", `Bearer ${token}`);

    const { body, status } = response;
    expect(status).toBe(200);
    expect(typeof body.terms).toBe("object");
  });

  it("for a user not logged in, it should return status 401 and a void object", async () => {
    const response = await supertest(app)
      .get("/tests-by-disciplines")
      .set("Authorization", `Bearer ${faker.datatype.string(30)}`);

    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toStrictEqual({});
  });
});

describe("GET /tests-by-teachers", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("for a user logged in, it should return status 200 and an object with the prop terms", async () => {
    const user = userFactory();

    await supertest(app).post("/users").send(user);
    const { body: bodyWithToken } = await supertest(app)
      .post("/auth/login")
      .send(user);

    const token = bodyWithToken.token;
    const response = await supertest(app)
      .get("/tests-by-teachers")
      .set("Authorization", `Bearer ${token}`);

    const { body, status } = response;
    expect(status).toBe(200);
    expect(typeof body.teachers).toBe("object");
  });

  it("for a user not logged in, it should return status 401 and a void object", async () => {
    const response = await supertest(app)
      .get("/tests-by-teachers")
      .set("Authorization", `Bearer ${faker.datatype.string(30)}`);

    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toStrictEqual({});
  });
});
