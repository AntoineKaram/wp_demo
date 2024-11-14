import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { addSupplier } from './commands/addSupplier';
import { updateSupplier } from './commands/updateSupplier';
import { deleteSupplier } from './commands/deleteSupplier';
import { getSuppliers, getSupplierById } from './queries/getSupplier';

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.get('/suppliers', async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const suppliers = await getSuppliers(Number(limit), skip);
  res.json(suppliers);
});

app.get(
  '/suppliers/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const supplier = await getSupplierById(req.params.id);
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
    } else {
      res.json(supplier);
    }
  }
);

app.post('/suppliers', async (req: Request, res: Response) => {
  const { name, vatNumber } = req.body;
  if (!name || !vatNumber) {
    res.status(400).json({ error: 'Name and VAT Number are required' });
  } else {
    const supplier = await addSupplier(name, vatNumber);
    res.status(201).json(supplier);
  }
});

app.put(
  '/suppliers/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const supplier = await updateSupplier(req.params.id, req.body);
    res.json(supplier);
  }
);

app.delete(
  '/suppliers/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    await deleteSupplier(req.params.id);
    res.status(204).send();
  }
);

app.listen(PORT, () => {
  console.log(`Data Service running on port ${PORT}`);
});
