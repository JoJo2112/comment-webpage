import { query } from '$lib/db';

export async function get() {
  try {
    const res = await query`SELECT * FROM articles LIMIT 1;`;

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
