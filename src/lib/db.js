import 'dotenv/config';

import * as pg from 'pg';
const { Pool } = pg;

const pool = new Pool();

async function query(text, params) {
  console.log(pg);
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}

export { query };
