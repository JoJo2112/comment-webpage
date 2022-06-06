import { query } from '$lib/db';

export async function get({ url }) {
  try {
    const name = url.searchParams.get('name');

    if (!name) {
      const countAll =
        await query`SELECT keywords.text as name, COUNT(keywords.text) FROM keywords, articles_keywords_links
                    WHERE keywords.id = articles_keywords_links.keyword_id
                    GROUP BY keywords.text
                    ORDER BY COUNT(keywords.text) DESC`;

      const converted = countAll.map((el) => {
        return { name: el.name, count: parseInt(el.count) };
      });

      return {
        body: converted,
      };
    }

    const countRow =
      await query`SELECT COUNT(*) FROM keywords, articles_keywords_links
                  WHERE articles_keywords_links.keyword_id = keywords.id
                  AND keywords.text = ${name}`;

    return {
      body: {
        count: parseInt(countRow[0].count),
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
