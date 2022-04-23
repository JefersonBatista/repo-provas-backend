import prisma from "../database.js";

async function getByDiscipline() {
  const tests = await prisma.term.findMany({
    include: {
      disciplines: {
        select: {
          id: true,
          name: true,
          teachersDisciplines: {
            select: {
              id: true,
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

export default {
  getByDiscipline,
};
