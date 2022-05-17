import { query } from '$lib/db';

export async function get() {
  try {
    const articleCount = await query('SELECT COUNT(*) FROM articles;');
    const commentCount = await query('SELECT COUNT(*) FROM comments;');
    return {
      body: {
        articleCount: articleCount.rows[0].count,
        commentCount: commentCount.rows[0].count,
        commentsPerArticle:
          commentCount.rows[0].count / articleCount.rows[0].count,
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
