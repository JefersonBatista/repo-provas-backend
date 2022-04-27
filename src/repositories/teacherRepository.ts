import prisma from "../database.js";

async function getById(id: number) {
  const teacher = await prisma.teacher.findUnique({
    where: {
      id,
    },
  });

  return teacher;
}

async function getByDisciplineId(disciplineId: number) {
  const teachersFromRelation = await prisma.teacherDiscipline.findMany({
    where: {
      disciplineId,
    },
    select: {
      teacher: true,
    },
  });

  const teachers = teachersFromRelation.map((t) => t.teacher);
  return teachers;
}

export default { getById, getByDisciplineId };
