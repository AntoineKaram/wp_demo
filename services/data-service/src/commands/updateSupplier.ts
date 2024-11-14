import prisma from "../utils/prismaClient";

export async function updateSupplier(id: string, data: { name?: string; vatNumber?: string }) {
  return prisma.supplier.update({
    where: { id },
    data,
  });
}
