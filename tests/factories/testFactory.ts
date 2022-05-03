import { faker } from "@faker-js/faker";

import { CreateTestData } from "../../src/repositories/testRepository.js";

export function testFactory() {
  const disciplineId = faker.datatype.number({ min: 1, max: 9 });
  const teacherId = Math.floor((disciplineId - 1) / 3) + 1;

  const test: CreateTestData = {
    name: faker.lorem.words(2),
    pdfUrl: faker.internet.url(),
    categoryId: faker.datatype.number({ min: 1, max: 5 }),
    disciplineId,
    teacherId,
  };

  return test;
}

export function testWithInvalidUrl() {
  const disciplineId = faker.datatype.number({ min: 1, max: 9 });
  const teacherId = Math.floor((disciplineId - 1) / 3) + 1;

  const invalidTest: CreateTestData = {
    name: faker.lorem.words(2),
    pdfUrl: faker.datatype.string(30),
    categoryId: faker.datatype.number({ min: 1, max: 5 }),
    disciplineId,
    teacherId,
  };

  return invalidTest;
}

export function testWithInvalidTeacherDiscipline() {
  const disciplineId = faker.datatype.number({ min: 1, max: 9 });
  let teacherId = Math.floor((disciplineId - 1) / 3);
  teacherId = ((teacherId + 1) % 3) + 1;

  const invalidTest: CreateTestData = {
    name: faker.lorem.words(2),
    pdfUrl: faker.internet.url(),
    categoryId: faker.datatype.number({ min: 1, max: 5 }),
    disciplineId,
    teacherId,
  };

  return invalidTest;
}
