import type { Rows } from "../../../../database/client";
import databaseClient from "../../../../database/client";
import formattedTimestamp from "../../../utils/formattedTimestamp";

type PostComment = {
  id: number;
  content: string;
  timestamp: string;
  user_id: number;
};

type User = {
  id: number;
  username: string;
  avatar: string;
};

type PostCommentWithUser = Omit<PostComment, "user_id"> & {
  user: User;
};

class PostCommentsRepository {
  async readAll(postId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        c.id AS comment_id,
        c.content,
        c.created_at,
        c.post_id,
        c.user_id,
        u.id AS user_id,
        CONCAT (u.firstname, ' ', u.lastname) AS username,
        u.avatar
      FROM comment AS c
      JOIN user AS u
      ON c.user_id = u.id
      WHERE c.post_id = ?
      `,
      [postId],
    );

    const formattedRows: PostCommentWithUser[] = rows.map((row) => ({
      id: row.comment_id,
      content: row.content,
      timestamp: formattedTimestamp(new Date(row.created_at)),
      user: {
        id: row.user_id,
        username: row.username,
        avatar: row.avatar,
      },
    }));

    return formattedRows;
  }
}

export default new PostCommentsRepository();
