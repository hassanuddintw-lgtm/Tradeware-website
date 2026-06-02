const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.vehicle.count();
        console.log('---DATABASE_COUNT---');
        console.log(count);
        console.log('-------------------');
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
