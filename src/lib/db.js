import 'dotenv/config';

let _sql;

async function sql() {
  if (!_sql) {
    console.log('No pg instance, creating...');
    const pg = (await import('postgres')).default;
    _sql = pg();
  }
  const start = Date.now();
  const res = await _sql.apply(_sql, arguments);
  console.log('executed query', {
    text: res.statement.string,
    duration: Date.now() - start,
    rows: res.count,
  });
  return res;
}

export default sql;
