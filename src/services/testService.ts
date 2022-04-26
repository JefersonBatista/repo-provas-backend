import testRepository from "../repositories/testRepository.js";
import { testNotFoundError } from "../utils/errorUtils.js";

async function getByDisciplines() {
  const tests = await testRepository.getByDisciplines();
  return tests;
}

async function getByTeachers() {
  const tests = await testRepository.getByTeachers();
  return tests;
}

async function getByIdOrFail(id: number) {
  const test = await testRepository.getById(id);
  if (!test) {
    throw testNotFoundError();
  }

  return test;
}

async function incrementViewCountById(id: number) {
  await getByIdOrFail(id);
  await testRepository.incrementViewCountById(id);
}

export default { getByDisciplines, getByTeachers, incrementViewCountById };
