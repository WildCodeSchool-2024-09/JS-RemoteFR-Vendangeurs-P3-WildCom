import databaseClient from "../../../../database/client";
import formattedTimestamp from "../../../utils/formattedTimestamp";

import type { Rows } from "../../../../database/client";

type EventComment = {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
  event_id: number;
};

type User = {
  id: number;
  username: string;
  avatar: string;
};

type EventCommentWithUser = Omit<EventComment, "user_id"> & {
  user: User;
};

class EventCommentRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(`
      SELECT user.id AS user_id,
      CONCAT (user.firstname, ' ', user.lastname) AS username,
      user.avatar,
      comment.id AS comment_id,
      comment.content,
      comment.user_id,
      comment.post_id,
      comment.event_id
      FROM comment
      JOIN user
      ON comment.user_id = user.id
      WHERE comment.post_id IS NULL AND comment.event_id IS NOT NULL
      `);

    const formattedRows: EventCommentWithUser[] = rows.map((row) => ({
      id: row.comment_id,
      content: row.content,
      user_id: row.user_id,
      post_id: row.post_id,
      event_id: row.event_id,
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

export default new EventCommentRepository();
