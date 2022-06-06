import { query } from '$lib/db';

export async function get({ url }) {
  try {
    const name = url.searchParams.get('name');

    const articleCount =
      await query`SELECT COUNT(*) FROM keywords, articles_keywords_links
      WHERE articles_keywords_links.keyword_id = keywords.id
      AND keywords.text = ${name}`;

    const commentCount =
      await query`SELECT COUNT(*) FROM keywords, articles_keywords_links, articles, comments_article_links
      WHERE articles_keywords_links.keyword_id = keywords.id
      AND articles_keywords_links.article_id = articles.id
      AND comments_article_links.article_id = articles.id
      AND keywords.text = ${name}`;

    let articleDistr =
      await query`SELECT platforms.name, COUNT(*) FROM keywords, articles_keywords_links, articles, platforms, articles_platform_links
      WHERE articles_keywords_links.keyword_id = keywords.id
      AND articles_keywords_links.article_id = articles.id
      AND articles_platform_links.article_id = articles.id
      AND articles_platform_links.platform_id = platforms.id
      AND keywords.text = ${name}
      GROUP BY (platforms.name)`;

    let commentDistr =
      await query`SELECT platforms.name, COUNT(*) FROM keywords, articles_keywords_links, articles, comments_article_links, platforms, articles_platform_links
      WHERE articles_keywords_links.keyword_id = keywords.id
      AND articles_keywords_links.article_id = articles.id
       AND comments_article_links.article_id = articles.id
      AND articles_platform_links.article_id = articles.id
      AND articles_platform_links.platform_id = platforms.id
      AND keywords.text = ${name}
      GROUP BY (platforms.name)`;

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
        articleCount: parseInt(articleCount[0].count),
        commentCount: parseInt(commentCount[0].count),
        commentsPerArticle: commentCount[0].count / articleCount[0].count,
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
