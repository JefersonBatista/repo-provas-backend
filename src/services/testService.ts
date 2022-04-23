import testRepository from "../repositories/testRepository.js";

async function getByDiscipline() {
  const tests = await testRepository.getByDiscipline();
  return tests;
}

export default {
  getByDiscipline,
};
