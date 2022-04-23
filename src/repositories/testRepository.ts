import prisma from "../database.js";

async function getByDisciplines() {
  const tests = await prisma.term.findMany({
    include: {
      disciplines: {
        select: {
          id: true,
          name: true,
          teachersDisciplines: {
            select: {
              teacher: true,
              tests: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return { terms: tests };
}

async function getByTeachers() {
  const tests = await prisma.teacher.findMany({
    include: {
      teachersDisciplines: {
        select: {
          discipline: {
            select: {
              id: true,
              name: true,
            },
          },
          tests: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
    },
  });

  return { teachers: tests };
}

export default { getByDisciplines, getByTeachers };
