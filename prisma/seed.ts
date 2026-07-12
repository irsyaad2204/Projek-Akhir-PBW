import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Super Admin
  await prisma.user.upsert({
    where: { username: "superadmin" },
    update: {},
    create: {
      username: "superadmin",
      password: hashedPassword,
      namaLengkap: "Super Administrator",
      role: "SUPER_ADMIN",
      status: "AKTIF",
    },
  });

  // Admin RM
  await prisma.user.upsert({
    where: { username: "admin.rm" },
    update: {},
    create: {
      username: "admin.rm",
      password: hashedPassword,
      namaLengkap: "Admin Gudang RM",
      role: "ADMIN_RM",
      status: "AKTIF",
    },
  });

  // Supervisor Produksi
  await prisma.user.upsert({
    where: { username: "supervisor" },
    update: {},
    create: {
      username: "supervisor",
      password: hashedPassword,
      namaLengkap: "Supervisor Produksi",
      role: "SUPERVISOR_PRODUKSI",
      status: "AKTIF",
    },
  });

  // Admin FG
  await prisma.user.upsert({
    where: { username: "admin.fg" },
    update: {},
    create: {
      username: "admin.fg",
      password: hashedPassword,
      namaLengkap: "Admin Gudang FG",
      role: "ADMIN_FG",
      status: "AKTIF",
    },
  });

  // Manager
  await prisma.user.upsert({
    where: { username: "manager" },
    update: {},
    create: {
      username: "manager",
      password: hashedPassword,
      namaLengkap: "Manager Approval",
      role: "MANAGER",
      status: "AKTIF",
    },
  });

  console.log("✅ Seeding selesai!");
  console.log("Username: superadmin | Password: admin123");
  console.log("Username: admin.rm   | Password: admin123");
  console.log("Username: supervisor | Password: admin123");
  console.log("Username: admin.fg   | Password: admin123");
  console.log("Username: manager    | Password: admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());