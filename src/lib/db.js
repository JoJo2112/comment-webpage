import 'dotenv/config';

const createPool = async () => {
  try {
    const pg = (await import('pg')).default;
    const { Pool } = pg;
    console.log('new Pool created.');
    return new Pool();
  } catch (e) {
    console.log(e);
  }
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
