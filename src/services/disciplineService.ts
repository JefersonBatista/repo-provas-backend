import disciplineRepository from "../repositories/disciplineRepository.js";
import { disciplineNotFoundError } from "../utils/errorUtils.js";

async function getByIdOrFail(id: number) {
  const discipline = await disciplineRepository.getById(id);
  if (!discipline) {
    throw disciplineNotFoundError();
  }

  return discipline;
}

async function getAll() {
  const disciplines = await disciplineRepository.getAll();
  return disciplines;
}

export default { getByIdOrFail, getAll };
