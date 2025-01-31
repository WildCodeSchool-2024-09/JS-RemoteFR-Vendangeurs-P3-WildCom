import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import { formattedTimestamp } from "../../utils/formattedTimestamp";

type Post = {
  id: number;
  category: number;
  picture?: string | null;
  content: string;
  timestamp?: string;
  userId: number;
};

type User = {
  id: number;
  username: string;
  avatar: string;
};

type PostWithUser = Omit<Post, "userId"> & {
  user: User;
};

class PostRepository {
  async create(content: string, category: string, userId: number) {
    const [result] = await databaseClient.query<Result>(
      `
      INSERT INTO post (content, category_id, user_id)
      VALUES (?, ?, ?)
      `,
      [content, category, userId],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
        post.id AS post_id, 
        category.name, 
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
      JOIN category
        ON post.category_id = category.id
      ORDER BY
        post.created_at DESC;
      `,
    );

    const formattedRows: PostWithUser[] = rows.map((row) => ({
      id: row.post_id,
      category: row.name,
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

  async read(postId: number) {
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
        user.avatar
      FROM post
      JOIN user
        ON post.user_id = user.id
      WHERE post.id = ?
      `,
      [postId],
    );

    const formattedRows: PostWithUser[] = rows.map((row) => ({
      id: row.post_id,
      category: row.category,
      picture: row.picture,
      content: row.content,
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

  async update(postId: number, content: string, category: string) {
    const [result] = await databaseClient.query<Result>(
      `
      UPDATE post
      SET content = ?, category = ?
      WHERE id = ?
      `,
      [content, category, postId],
    );

    return result.affectedRows;
  }
}

export default new PostRepository();
