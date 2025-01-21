import databaseClient from "../../../../database/client";
import formattedTimestamp from "../../../utils/formattedTimestamp";

import type { Rows } from "../../../../database/client";

type EventComment = {
  id: number;
  content: string;
  user_id: number;
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
  async readAll(eventId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        comment.id AS comment_id,
        comment.content,
        comment.created_at,
        comment.event_id,
        comment.user_id,
        user.id AS user_id,
        CONCAT (user.firstname, ' ', user.lastname) AS username,
        user.avatar
      FROM comment
      JOIN user 
      ON comment.user_id = user.id
      WHERE comment.event_id = ?
      `,
      [eventId],
    );

    const formattedRows: EventCommentWithUser[] = rows.map((row) => ({
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

export default new EventCommentRepository();
