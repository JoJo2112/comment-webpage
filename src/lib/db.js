import 'dotenv/config';
import { Pool } from 'pg/lib';

const pool = new Pool();

const db = {
  query: async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  },
};

export default db;
