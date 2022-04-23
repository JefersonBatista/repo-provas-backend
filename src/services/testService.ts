import testRepository from "../repositories/testRepository.js";

async function getByDisciplines() {
  const tests = await testRepository.getByDisciplines();
  return tests;
}

async function getByTeachers() {
  const tests = await testRepository.getByTeachers();
  return tests;
}

export default { getByDisciplines, getByTeachers };
