import 'dotenv/config';

const createPool = async () => {
  const pg = (await import('pg')).default;
  const { Pool } = pg;
  console.log('new POOOL');
  return new Pool();
};

const pool = createPool();

const db = {
  query: async (text, params) => {
    const start = Date.now();
    const res = await (await pool).query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  },
};

export default db;
