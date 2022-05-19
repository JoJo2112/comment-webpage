import pg from 'postgres';

const sql = pg();

async function query() {
  console.log(sql);
  const start = Date.now();
  const res = await sql.apply(sql, arguments);
  console.log('executed query', {
    text: res.statement.string,
    duration: Date.now() - start,
    rows: res.count,
  });
  return res;
}

export { query };
