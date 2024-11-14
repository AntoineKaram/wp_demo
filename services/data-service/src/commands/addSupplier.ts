import prisma from '../utils/prismaClient';

export async function addSupplier(name: string, vatNumber: string) {
  return prisma.supplier.create({
    data: { name, vatNumber },
  });
}
