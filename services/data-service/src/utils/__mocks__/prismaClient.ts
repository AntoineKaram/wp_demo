const mockPrisma = {
  supplier: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

export const PrismaClient = jest.fn(() => mockPrisma);
export default mockPrisma;
