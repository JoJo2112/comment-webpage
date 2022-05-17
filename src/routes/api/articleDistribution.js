import * as db from '$lib/db';

export async function get() {
  try {
    const count =
      await db.query`SELECT platforms.name, COUNT(*) FROM articles_platform_links, platforms WHERE articles_platform_links.platform_id = platforms.id GROUP BY name;`;

    let sorted = count.sort((x, y) => {
      if (x.name < y.name) return -1;
      if (x.name > y.name) return 1;
      return 0;
    });

    return {
      body: {
        newspapers: sorted,
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
