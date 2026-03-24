const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MySQL pool (RDS)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10
});

// Health check
app.get('/', (req, res) => {
  res.send('API running 🚀');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Get users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Add user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO users(name, email) VALUES (?, ?)',
      [name, email]
    );

    res.json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: 'Insert failed' });
  }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.listen(3000, () => console.log('Server running on 3000'));
