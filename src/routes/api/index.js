import sql from '$lib/db';
import 'dotenv/config';

export async function get() {
  try {
    const articleCount = await sql`SELECT COUNT(*) FROM articles;`;
    const commentCount = await sql`SELECT COUNT(*) FROM comments;`;
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
