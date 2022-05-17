import { query } from '$lib/db';

export async function get() {
  try {
    const count = await query(
      'SELECT platforms.name, COUNT(*) FROM comments_platform_links, platforms WHERE comments_platform_links.platform_id = platforms.id GROUP BY name'
    );

    let sorted = count.rows.sort((x, y) => {
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
