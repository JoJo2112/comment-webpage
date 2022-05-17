import 'dotenv/config';
import postgres from 'postgres';

let _sql;

function getSql() {
  if (_sql) return _sql;
  _sql = postgres();
  return _sql;
}

async function sql() {
  const start = Date.now();
  const res = await getSql().apply(_sql, arguments);
  console.log('executed query', {
    text: res.statement.string,
    duration: Date.now() - start,
    rows: res.count,
  });
  return res;
}

export default sql;
