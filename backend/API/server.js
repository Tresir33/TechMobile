const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();

// PostgreSQL connection
const pool = new Pool({
  host: 'your_host',
  user: 'your_username',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Serve static images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.listen(5000, () => console.log('Server running on port 5000'));