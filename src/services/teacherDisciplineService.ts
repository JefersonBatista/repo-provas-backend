import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
import { doesNotTeachDisciplineError } from "../utils/errorUtils.js";

async function getByIdsOrFail(disciplineId: number, teacherId: number) {
  const teacherDiscipline = await teacherDisciplineRepository.getByIds(
    disciplineId,
    teacherId
  );
  if (!teacherDiscipline) {
    throw doesNotTeachDisciplineError();
  }

  return teacherDiscipline;
}

export default { getByIdsOrFail };
