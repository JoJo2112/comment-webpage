import { query } from '$lib/testdb';

export async function get() {
  try {
    const articleCount = await query`SELECT COUNT(*) FROM articles;`;
    const commentCount = await query`SELECT COUNT(*) FROM comments;`;
    return {
      body: {
        articleCount: articleCount[0].count,
        commentCount: commentCount[0].count,
        commentsPerArticle: commentCount[0].count / articleCount[0].count,
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
