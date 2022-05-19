import { query } from '$lib/testdb';

export async function get(test) {
  try {
    query`test`;

    return {
      body: {
        test,
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
