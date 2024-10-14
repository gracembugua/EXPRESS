import express, { Request, Response } from 'express';
import { XataClient } from './xata';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const xata = new XataClient();

// Create a new product (C)
app.post('/products', async (req: Request, res: Response) => {
  try {
    const newProduct = await xata.db.products.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Read all products (R)
app.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await xata.db.products.getAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Update a product (U)
app.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await xata.db.products.update(id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product (D)
app.delete('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await xata.db.products.delete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
