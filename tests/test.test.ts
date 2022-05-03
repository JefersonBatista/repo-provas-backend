import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../src/app";
import prisma from "../src/database";
import { userFactory } from "./factories/userFactory";
import {
  testFactory,
  testWithInvalidTeacherDiscipline,
  testWithInvalidUrl,
} from "./factories/testFactory";

describe("GET /tests-by-disciplines", () => {
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
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("for a user logged in, it should return status 200 and an object with the prop teachers", async () => {
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

describe("POST /tests", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("given an invalid pdfUrl, return status 400 and do not add test", async () => {
    const user = userFactory();
    await supertest(app).post("/users").send(user);
    const { body } = await supertest(app).post("/auth/login").send(user);
    const { token } = body;

    const invalidTest = testWithInvalidUrl();
    const { status } = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidTest);

    const tests = await prisma.test.findMany({});

    expect(status).toBe(400);
    expect(tests.length).toBe(0);
  });

  it("given invalid teacher and discipline, return status 422 and do not add test", async () => {
    const user = userFactory();
    await supertest(app).post("/users").send(user);
    const { body } = await supertest(app).post("/auth/login").send(user);
    const { token } = body;

    const invalidTest = testWithInvalidTeacherDiscipline();
    const { status } = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidTest);

    const tests = await prisma.test.findMany({});

    expect(status).toBe(422);
    expect(tests.length).toBe(0);
  });

  it("given a valid test, return status 201 and add test in db", async () => {
    const user = userFactory();
    await supertest(app).post("/users").send(user);
    const { body } = await supertest(app).post("/auth/login").send(user);
    const { token } = body;

    const test = testFactory();
    const { status } = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(test);

    const tests = await prisma.test.findMany({});

    expect(status).toBe(201);
    expect(tests.length).toBe(1);
  });
});
