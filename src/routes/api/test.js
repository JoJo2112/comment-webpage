import pg from 'postgres';

export async function get({ params }) {
  try {
    console.log(pg);

    return {
      body: {
        params,
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
