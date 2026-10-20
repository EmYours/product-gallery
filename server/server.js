import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import productsRouter from './routes/products.js';

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/products', productsRouter);

app.use((error, req, res, next) => {
  if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid product ID.' });
  if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
  console.error(error);
  res.status(500).json({ message: 'Unexpected server error.' });
});

const port = process.env.PORT || 5000;
connectDatabase()
  .then(() => app.listen(port, () => console.log(`API listening on port ${port}`)))
  .catch((error) => { console.error('Database connection failed:', error.message); process.exit(1); });
