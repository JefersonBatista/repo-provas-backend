import categoryService from "./categoryService.js";
import disciplineService from "./disciplineService.js";
import teacherService from "./teacherService.js";
import testRepository, {
  CreateTestData,
} from "../repositories/testRepository.js";
import { testNotFoundError } from "../utils/errorUtils.js";
import teacherDisciplineService from "./teacherDisciplineService.js";

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

async function create(data: CreateTestData) {
  const { categoryId, disciplineId, teacherId } = data;

  await categoryService.getByIdOrFail(categoryId);
  await disciplineService.getByIdOrFail(disciplineId);
  await teacherService.getByIdOrFail(teacherId);
  await teacherDisciplineService.getByIdsOrFail(disciplineId, teacherId);

  await testRepository.insert(data);
}

export default {
  getByDisciplines,
  getByTeachers,
  incrementViewCountById,
  create,
};
