import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import { PrismaClient, UserRole } from "../src/infra/database/prisma/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("@dmin678", 10);
  await prisma.user.upsert({
    where: {
      email: "admin@pollify.com",
    },
    update: {},
    create: {
      fullname: "Administrator",
      email: "admin@pollify.com",
      password,
      role: UserRole.ADMIN,
    },
  });
  console.log("✅ Admin created");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
