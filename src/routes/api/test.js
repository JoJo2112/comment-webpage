import { query } from '$lib/testdb';

export async function get() {
  try {
    const res = query`SELECT * FROM articles;`;

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
