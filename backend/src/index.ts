import cors from 'cors';
import express from 'express';
import { pool } from './db.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      dbTime: result.rows[0].now,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.get('/', (req, res) => {
  res.send("Hello, World")
})

// 0.0.0.0 is mandatory for Docker port mapping to work
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on http://0.0.0.0:${PORT}`);
});
