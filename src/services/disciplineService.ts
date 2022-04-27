import disciplineRepository from "../repositories/disciplineRepository.js";
import { disciplineNotFoundError } from "../utils/errorUtils.js";

async function getByIdOrFail(id: number) {
  const discipline = await disciplineRepository.getById(id);
  if (!discipline) {
    throw disciplineNotFoundError();
  }

  return discipline;
}

export default { getByIdOrFail };
