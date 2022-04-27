import prisma from "../database.js";

async function getByIds(disciplineId: number, teacherId: number) {
  const teacherDiscipline = prisma.teacherDiscipline.findUnique({
    where: {
      teacherId_disciplineId: {
        disciplineId,
        teacherId,
      },
    },
  });

  return teacherDiscipline;
}

export default {
  getByIds,
};
