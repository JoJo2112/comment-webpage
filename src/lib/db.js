import 'dotenv/config';
import postgres from 'postgres';

let _sql = postgres();

async function sql() {
  if (!_sql) _sql = postgres();
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
