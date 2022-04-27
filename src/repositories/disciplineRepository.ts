import prisma from "../database.js";

async function getById(id: number) {
  const discipline = await prisma.discipline.findUnique({
    where: {
      id,
    },
  });

  return discipline;
}

async function getAll() {
  const disciplines = await prisma.discipline.findMany({});
  return disciplines;
}

export default { getById, getAll };
