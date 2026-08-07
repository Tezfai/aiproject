
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


//createing a prismaclient instance and exporting it for use in other parts of the application. The code checks if a PrismaClient instance already exists in the global scope, and if not, it creates a new one. This is useful for avoiding multiple instances of PrismaClient in development, which can lead to issues with database connections.