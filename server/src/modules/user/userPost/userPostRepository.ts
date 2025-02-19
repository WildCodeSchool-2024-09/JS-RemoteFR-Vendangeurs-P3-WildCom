import type { Rows } from "../../../../database/client";
import databaseClient from "../../../../database/client";
import { formattedTimestamp } from "../../../utils/formattedTimestamp";

type User = {
  id: number;
  avatar: string;
  username: string;
};

type Post = {
  id: number;
  user_id: number;
  content: string;
  picture: string;
  timestamp: string;
  totalComments: number;
  totalLikes: number;
  categoryName: string;
};

type PostWithUser = Omit<Post, "user_id"> & {
  user: User;
};

class UserPostRepository {
  async readAll(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        post.id AS post_id,
        post_picture.path AS picture,
        post.content,
        post.created_at,

        category.name,

        (
        SELECT count (*)
        FROM comment
        WHERE comment.post_id = post.id
        ) AS total_comments,

        (
          SELECT COUNT(*)
          FROM post_like AS pl
          WHERE pl.post_id = post.id
        ) AS total_likes,

        user.id AS user_id,
        CONCAT(user.firstname, ' ', user.lastname) AS username,

        avatar.path AS avatar_path

      FROM post

      JOIN user
      ON post.user_id = user.id

      JOIN category
      ON post.category_id = category.id

      LEFT JOIN post_picture
      ON post_picture.id = post.picture_id

      LEFT JOIN avatar
      ON avatar.id = user.avatar_id

      WHERE user.id = ?

      `,
      [userId],
    );

    const formattedRows: PostWithUser[] = rows.map((row) => ({
      id: row.post_id,
      categoryName: row.name,
      picture: row.picture,
      content: row.content,
      totalComments: row.total_comments,
      totalLikes: row.total_likes,
      timestamp: formattedTimestamp(new Date(row.created_at)),
      user: {
        id: row.user_id,
        avatar: row.avatar_path,
        username: row.username,
      },
    }));
    return formattedRows;
  }
}

export default new UserPostRepository();
