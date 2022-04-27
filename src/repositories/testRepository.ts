import prisma from "../database.js";
import teacherDisciplineRepository from "./teacherDisciplineRepository.js";

export interface CreateTestData {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineId: number;
  teacherId: number;
}

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

async function insert(data: CreateTestData) {
  const { name, pdfUrl, categoryId, disciplineId, teacherId } = data;

  const teacherDiscipline = await teacherDisciplineRepository.getByIds(
    disciplineId,
    teacherId
  );

  await prisma.test.create({
    data: {
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId: teacherDiscipline.id,
    },
  });
}

export default {
  getByDisciplines,
  getByTeachers,
  getById,
  incrementViewCountById,
  insert,
};
