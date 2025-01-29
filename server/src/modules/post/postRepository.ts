import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import formattedTimestamp from "../../utils/formattedTimestamp";

type Post = {
  id: number;
  category: string;
  picture: string | null;
  content: string;
  timestamp?: string;
  user_id: number;
};

type User = {
  id: number;
  username: string;
  avatar: string;
};

type PostWithUser = Omit<Post, "user_id"> & {
  user: User;
};

class PostRepository {
  async create(post: Omit<Post, "id">) {
    const [result] = await databaseClient.query<Result>(
      `
      INSERT INTO post (content, user_id)
      VALUES (?, ?)
      `,
      [post.content, post.user_id],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
        post.id AS post_id, 
        post.category, 
        post.picture, 
        post.content, 
        post.created_at,
        user.id AS user_id, 
        CONCAT (user.firstname,' ', user.lastname) AS username,
        user.avatar,
        (
          SELECT COUNT(*)
          FROM comment
          WHERE comment.post_id = post.id
        ) AS total_comments,
        (
        SELECT COUNT(*)
        FROM post_like AS pl
        WHERE pl.post_id = post.id
        ) AS total_likes
      FROM post
      JOIN user 
        ON post.user_id = user.id
      ORDER BY
        post.created_at DESC;
      `,
    );

    const formattedRows: PostWithUser[] = rows.map((row) => ({
      id: row.post_id,
      category: row.category,
      picture: row.picture,
      content: row.content,
      totalComments: row.total_comments,
      totalLikes: row.total_likes,
      timestamp: formattedTimestamp(new Date(row.created_at)),
      user: {
        id: row.user_id,
        username: row.username,
        avatar: row.avatar,
      },
    }));

    return formattedRows;
  }
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM post WHERE id = ?",

      [id],
    );
    return result.affectedRows;
  }
}

export default new PostRepository();
