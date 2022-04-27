import teacherRepository from "../repositories/teacherRepository.js";
import { teacherNotFoundError } from "../utils/errorUtils.js";

async function getByIdOrFail(id: number) {
  const teacher = await teacherRepository.getById(id);
  if (!teacher) {
    throw teacherNotFoundError();
  }

  return teacher;
}

export default { getByIdOrFail };
