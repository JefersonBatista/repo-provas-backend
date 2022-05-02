import prisma from "../src/database.js";

async function main() {
  // Creating categories
  for (let i = 1; i <= 4; i++) {
    await prisma.category.upsert({
      where: { name: `P${i}` },
      update: {},
      create: {
        name: `P${i}`,
      },
    });
  }

  await prisma.category.upsert({
    where: { name: `PF` },
    update: {},
    create: {
      name: `PF`,
    },
  });

  // Creating terms
  for (let i = 1; i <= 3; i++) {
    await prisma.term.upsert({
      where: { number: i },
      update: {},
      create: {
        number: i,
      },
    });
  }

  // Creating teachers
  const teachers = ["Bruna", "Pedrão", "Dina"];
  for (let i = 0; i < teachers.length; i++) {
    await prisma.teacher.upsert({
      where: { name: teachers[i] },
      update: {},
      create: {
        name: teachers[i],
      },
    });
  }

  // Creating disciplines
  const disciplines = [
    "Autodidatismo",
    "Gestão do tempo",
    "Gestão Emocional",
    "HTML",
    "CSS",
    "JavaScript",
    "Node",
    "Express",
    "Arquitetura",
  ];
  for (let i = 0; i < disciplines.length; i++) {
    await prisma.discipline.upsert({
      where: { name: disciplines[i] },
      update: {},
      create: {
        name: disciplines[i],
        termId: (i % 3) + 1,
      },
    });
  }

  // Creating teachersDisciplines
  for (let i = 0; i < disciplines.length; i++) {
    const teacherId = Math.floor(i / 3) + 1;
    const disciplineId = i + 1;

    await prisma.teacherDiscipline.upsert({
      where: {
        teacherId_disciplineId: {
          teacherId,
          disciplineId,
        },
      },
      update: {},
      create: {
        disciplineId,
        teacherId,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
