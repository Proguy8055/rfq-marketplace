require("dotenv").config();

const prisma = require("./utils/prisma");

async function testDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();