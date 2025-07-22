import express from 'express';
   import { Pool } from 'pg';
   import path from 'path';
   import { fileURLToPath } from 'node:url';
   import cors from 'cors';
   import portfinder from 'portfinder';

   const app = express();

   // Derive __dirname for ES modules
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

   // PostgreSQL connection
   const pool = new Pool({
     host: 'localhost',
     user: 'postgres',
     database: 'ecommerce',
     password: 'Tresilaho@10',
     port: 5432,
   });

   // Enable CORS
   app.use(cors());

   // Serve static images from backend/src/uploads/images
   app.use('/uploads', express.static(path.join(__dirname, '../src/uploads/images')));

   // API to fetch products
   app.get('/api/products', async (req, res) => {
     try {
       const result = await pool.query('SELECT * FROM products');
       res.json(result.rows);
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal server error' });
     }
   });

   // Find an available port
   portfinder.basePort = 5000;
   portfinder.getPort((err, port) => {
     if (err) throw err;
     app.listen(port, () => console.log(`Server running on port ${port}`));
   });