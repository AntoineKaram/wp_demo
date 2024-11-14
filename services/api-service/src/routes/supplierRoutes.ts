import express from 'express';
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../utils/daprClient';

const router = express.Router();

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const suppliers = await getSuppliers(Number(page), Number(limit));
  res.json(suppliers);
});

router.get('/:id', async (req, res) => {
  const supplier = await getSupplierById(req.params.id);
  if (!supplier) res.status(404).json({ error: 'Supplier not found' });
  else res.json(supplier);
});

router.post('/', async (req, res) => {
  const { name, vatNumber } = req.body;
  if (!name || !vatNumber)
    res.status(400).json({ error: 'Name and VAT Number are required' });
  else {
    const supplier = await createSupplier({ name, vatNumber });
    res.status(201).json(supplier);
  }
});

router.put('/:id', async (req, res) => {
  const supplier = await updateSupplier(req.params.id, req.body);
  res.json(supplier);
});

router.delete('/:id', async (req, res) => {
  await deleteSupplier(req.params.id);
  res.status(204).send();
});

export default router;
