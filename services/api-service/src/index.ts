import express from 'express';
import bodyParser from 'body-parser';
import supplierRoutes from './routes/supplierRoutes';
const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/suppliers', supplierRoutes);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT as number, () => {
  console.log(`API Service running on port ${PORT}`);
});
