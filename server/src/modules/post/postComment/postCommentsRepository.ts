import type { Result, Rows } from "../../../../database/client";
import databaseClient from "../../../../database/client";
import { formattedTimestamp } from "../../../utils/formattedTimestamp";

type PostComment = {
  id: number;
  content: string;
  timestamp?: string;
  user_id?: number;
};

type User = {
  id: number;
  username: string;
  avatar: string;
};

type PostCommentWithUser = Omit<PostComment, "user_id"> & {
  user: User;
};

type NewPostComment = {
  postId: number;
  userId: number;
  content: string;
};

class PostCommentsRepository {
  async readAll(postId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        comment.id AS comment_id,
        comment.content,
        comment.created_at,
        comment.post_id,
        comment.user_id,
        user.id AS user_id,
        CONCAT (user.firstname, ' ', user.lastname) AS username,
        user.avatar
      FROM comment
      JOIN user 
      ON comment.user_id = user.id
      WHERE comment.post_id = ?
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

  async create(newPostComment: NewPostComment) {
    const [result] = await databaseClient.query<Result>(
      `
      INSERT INTO comment (post_id, user_id, content)
      VALUES (?, ?, ?)
      `,
      [newPostComment.postId, newPostComment.userId, newPostComment.content],
    );

    return result.insertId;
  }

  async update(post: PostComment) {
    const [result] = await databaseClient.query<Result>(
      `
      UPDATE comment
      SET content = ?
      WHERE id = ?
      `,
      [post.content, post.id],
    );

    return result.affectedRows;
  }
}
export default new PostCommentsRepository();
