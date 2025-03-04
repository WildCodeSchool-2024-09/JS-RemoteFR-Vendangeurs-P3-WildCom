import type { Result, Rows } from "../../../../database/client";
import databaseClient from "../../../../database/client";
import { formattedTimestamp } from "../../../utils/formattedTimestamp";

type EventComment = {
  id: number;
  content: string;
  user_id?: number;
};

type User = {
  id: number;
  username: string;
  avatar: string;
};

type EventCommentWithUser = Omit<EventComment, "user_id"> & {
  user: User;
};

type NewEventComment = {
  eventId: number;
  userId: number;
  content: string;
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
        avatar.path AS avatar_path
      FROM comment
      JOIN user 
      ON comment.user_id = user.id
      LEFT JOIN avatar
      ON avatar.id = user.avatar_id
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
        avatar: row.avatar_path,
      },
    }));

    return formattedRows;
  }

  async create(newEventComment: NewEventComment) {
    const [result] = await databaseClient.query<Result>(
      `
      INSERT INTO comment (event_id, user_id, content)
      VALUES (?, ?, ?)
      `,
      [
        newEventComment.eventId,
        newEventComment.userId,
        newEventComment.content,
      ],
    );
    return result.insertId;
  }

  async update(comment: EventComment) {
    const [result] = await databaseClient.query<Result>(
      `
      UPDATE comment
      SET content = ?
      WHERE id = ?
      `,
      [comment.content, comment.id],
    );

    return result.affectedRows;
  }
  async delete(eventId: number) {
    const [result] = await databaseClient.query<Result>(
      `
      DELETE
      FROM
      comment
      WHERE id = ?
      `,
      [eventId],
    );

    return result.affectedRows;
  }
}

export default new EventCommentRepository();
