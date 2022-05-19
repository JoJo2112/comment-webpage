import * as db from '$lib/db';

export async function get() {
  try {
    let articleDistr =
      await db.query`SELECT platforms.name, COUNT(*) FROM articles_platform_links, platforms WHERE articles_platform_links.platform_id = platforms.id GROUP BY name;`;
    let commentDistr =
      await db.query`SELECT platforms.name, COUNT(*) FROM comments_platform_links, platforms WHERE comments_platform_links.platform_id = platforms.id GROUP BY name`;

    articleDistr = articleDistr.sort((x, y) => {
      if (x.name < y.name) return -1;
      if (x.name > y.name) return 1;
      return 0;
    });

    commentDistr = commentDistr.sort((x, y) => {
      if (x.name < y.name) return -1;
      if (x.name > y.name) return 1;
      return 0;
    });

    return {
      body: {
        articleDistr,
        commentDistr,
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
