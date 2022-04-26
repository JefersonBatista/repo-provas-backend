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
                  pdfUrl: true,
                  viewCount: true,
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
              pdfUrl: true,
              viewCount: true,
            },
          },
        },
      },
    },
  });

  return { teachers: tests };
}

async function getById(id: number) {
  const test = await prisma.test.findUnique({
    where: { id },
  });

  return test;
}

async function incrementViewCountById(id: number) {
  await prisma.test.update({
    where: { id },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });
}

export default {
  getByDisciplines,
  getByTeachers,
  getById,
  incrementViewCountById,
};
