import * as db from '$lib/db';

export async function get() {
  try {
    const res = await db.query`SELECT * from comments LIMIT 100;`;

    return {
      body: {
        res,
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
