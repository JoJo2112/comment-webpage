import pg from 'postgres';

const sql = pg();

//for queries (logs statement, duration and number of rows)
async function query() {
  const start = Date.now();
  const res = await sql.apply(sql, arguments);
  console.log('executed query', {
    text: res.statement.string,
    duration: Date.now() - start,
    rows: res.count,
  });
  return res;
}

//for transactions (only logs duration)
async function begin(callback) {
  const start = Date.now();
  const res = await sql.begin(callback);
  console.log('executed transaction', {
    duration: Date.now() - start,
  });
  return res;
}

export { query, begin };
