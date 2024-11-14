import prisma from '../utils/prismaClient';
import { getSuppliers, getSupplierById } from '../queries/getSupplier';

jest.mock('../utils/prismaClient');

describe('Queries - Supplier Operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getSuppliers should return a list of suppliers', async () => {
    const mockSuppliers = [
      { id: '1', name: 'Supplier 1', vatNumber: '12345678' },
      { id: '2', name: 'Supplier 2', vatNumber: '87654321' },
    ];
    (prisma.supplier.findMany as jest.Mock).mockResolvedValue(mockSuppliers);

    const result = await getSuppliers(10, 0);

    expect(prisma.supplier.findMany).toHaveBeenCalledWith({
      take: 10,
      skip: 0,
      orderBy: { name: 'asc' },
    });
    expect(result).toEqual(mockSuppliers);
  });

  test('getSupplierById should return a supplier by ID', async () => {
    const mockSupplier = { id: '1', name: 'Supplier 1', vatNumber: '12345678' };
    (prisma.supplier.findUnique as jest.Mock).mockResolvedValue(mockSupplier);

    const result = await getSupplierById('1');

    expect(prisma.supplier.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(result).toEqual(mockSupplier);
  });

  test('getSupplierById should return null if supplier not found', async () => {
    (prisma.supplier.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await getSupplierById('nonexistent-id');

    expect(prisma.supplier.findUnique).toHaveBeenCalledWith({
      where: { id: 'nonexistent-id' },
    });
    expect(result).toBeNull();
  });
});
