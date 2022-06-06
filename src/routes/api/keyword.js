import { query } from '$lib/db';

export async function get() {
  try {
    const countAll =
      await query`SELECT keywords.text as name FROM keywords, articles_keywords_links
                    WHERE keywords.id = articles_keywords_links.keyword_id
                    GROUP BY keywords.text
                    ORDER BY COUNT(keywords.text) DESC`;

    const converted = countAll.map((el) => {
      return el.name;
    });

    return {
      body: converted,
    };
  } catch (e) {
    console.log(e);
    return {
      body: 'An error occured',
      status: 400,
    };
  }
}
