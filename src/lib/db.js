let sql;

async function query() {
  if (!sql) {
    console.log('No pg instance, creating...');
    const pg = (await import('postgres')).default;
    sql = pg();
  }
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
