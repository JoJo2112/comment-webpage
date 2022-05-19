import { pg } from '$lib/testdb';

export async function get(test) {
  try {
    console.log(pg);

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
