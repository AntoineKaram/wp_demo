import prisma from '../utils/prismaClient';

export async function deleteSupplier(id: string) {
  return prisma.supplier.delete({
    where: { id },
  });
}
