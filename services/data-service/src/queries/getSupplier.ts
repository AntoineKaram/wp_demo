import prisma from '../utils/prismaClient';

export async function getSuppliers(take: number, skip: number) {
  return prisma.supplier.findMany({
    take,
    skip,
    orderBy: { name: 'asc' },
  });
}

export async function getSupplierById(id: string) {
  return prisma.supplier.findUnique({
    where: { id },
  });
}
