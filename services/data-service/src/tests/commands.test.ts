import prisma from '../utils/prismaClient';
import { addSupplier } from '../commands/addSupplier';
import { updateSupplier } from '../commands/updateSupplier';
import { deleteSupplier } from '../commands/deleteSupplier';

jest.mock('../utils/prismaClient');

describe('Commands - Supplier Operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('addSupplier should create a supplier', async () => {
    //Arrange
    const mockSupplier = {
      id: '1',
      name: 'Test Supplier',
      vatNumber: '12345678',
    };
    (prisma.supplier.create as jest.Mock).mockResolvedValue(mockSupplier);
    
    //Act
    const result = await addSupplier('Test Supplier', '12345678');
    
    //Assert
    expect(prisma.supplier.create).toHaveBeenCalledWith({
      data: { name: 'Test Supplier', vatNumber: '12345678' },
    });
    expect(result).toEqual(mockSupplier);
  });

  test('updateSupplier should update a supplier', async () => {
    const mockUpdatedSupplier = {
      id: '1',
      name: 'Updated Supplier',
      vatNumber: '12345678',
    };
    (prisma.supplier.update as jest.Mock).mockResolvedValue(
      mockUpdatedSupplier
    );

    const result = await updateSupplier('1', { name: 'Updated Supplier' });

    expect(prisma.supplier.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { name: 'Updated Supplier' },
    });
    expect(result).toEqual(mockUpdatedSupplier);
  });

  test('deleteSupplier should delete a supplier', async () => {
    const mockDeletedSupplier = {
      id: '1',
      name: 'Test Supplier',
      vatNumber: '12345678',
    };
    (prisma.supplier.delete as jest.Mock).mockResolvedValue(
      mockDeletedSupplier
    );

    const result = await deleteSupplier('1');

    expect(prisma.supplier.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(result).toEqual(mockDeletedSupplier);
  });
});
