const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create classes
    const classA = await prisma.class.create({
        data: { name: 'Class A' },
    });

    const classB = await prisma.class.create({
        data: { name: 'Class B' },
    });

    const classC = await prisma.class.create({
        data: { name: 'Class C' },
    });

    // Create students
    await prisma.student.create({
        data: {
            studentId: 'S001',
            name: 'John Doe',
            gender: 'Male',
            dob: '2000-01-01',
            classId: classA.id,
        },
    });

    await prisma.student.create({
        data: {
            studentId: 'S002',
            name: 'Jane Smith',
            gender: 'Female',
            dob: '2001-02-02',
            classId: classB.id,
        },
    });

    await prisma.student.create({
        data: {
            studentId: 'S003',
            name: 'Alex Johnson',
            gender: 'Male',
            dob: '2002-03-03',
            classId: classC.id,
        },
    });

    console.log('Seeding completed');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
