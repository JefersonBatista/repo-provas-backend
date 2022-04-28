import disciplineService from "../services/disciplineService.js";
import teacherRepository from "../repositories/teacherRepository.js";
import { teacherNotFoundError } from "../utils/errorUtils.js";

async function getByIdOrFail(id: number) {
  const teacher = await teacherRepository.getById(id);
  if (!teacher) {
    throw teacherNotFoundError();
  }

  return teacher;
}

async function getByDisciplineId(disciplineId: number) {
  await disciplineService.getByIdOrFail(disciplineId);
  const teachers = await teacherRepository.getByDisciplineId(disciplineId);
  return teachers;
}

export default { getByIdOrFail, getByDisciplineId };
