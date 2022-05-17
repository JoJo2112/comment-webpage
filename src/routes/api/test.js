import * as db from '$lib/db';

export async function get() {
  try {
    const articles = await db.begin(async (sql) => {
      const articles = await sql`SELECT * FROM articles LIMIT 10`;
      return articles;
    });

    return {
      body: {
        articles,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      body: 'An error occured',
      status: 400,
    };
  }
}
