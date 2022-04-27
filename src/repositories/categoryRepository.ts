import prisma from "../database.js";

async function getById(id: number) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return category;
}

async function getAll() {
  const categories = await prisma.category.findMany({});
  return categories;
}

export default { getById, getAll };
