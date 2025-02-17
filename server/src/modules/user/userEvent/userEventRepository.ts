import type { Rows } from "../../../../database/client";
import databaseClient from "../../../../database/client";
import {
  formattedDate,
  formattedTime,
  formattedTimestamp,
} from "../../../utils/formattedTimestamp";

type User = {
  id: number;
  avatar: string;
  username: string;
};
type Event = {
  id: number;
  content: string;
  picture: string;
  created_at?: Date;
  title: string;
  place: string;
  calendar: string;
  time: string;
  userId?: number;
  categoryId?: number;
  categoryName?: string;
};
type EventWithUser = Omit<Event, "user_id"> & {
  user: User;
};

class UserEventRepository {
  async readAll(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
        event.id AS event_id,
        event.content,
        category.name,
        event_picture.path AS picture,
        event.created_at,
        event.calendar,
        event.time,
        event.title,
        event.place,

        user.id AS user_id,
        CONCAT (user.firstname, ' ', user.lastname) AS username,

        avatar.path AS avatar_path,

        (
          SELECT COUNT(*)
          FROM comment
          WHERE comment.event_id = event.id
        ) AS total_comments,

        (
        SELECT COUNT(*)
        FROM event_participation AS ep
        WHERE ep.event_id = event.id
        ) AS total_participations

      FROM event

      JOIN user
      ON event.user_id = user.id

      JOIN category
        ON event.category_id = category.id

      LEFT JOIN event_picture
        ON event.picture_id = event_picture.id

      JOIN avatar
        ON user.avatar_id = avatar.id

      WHERE user.id = ?
      ORDER BY
        event.created_at DESC;
      `,
      [userId],
    );

    const formattedRows: EventWithUser[] = rows.map((row) => ({
      id: row.event_id,
      content: row.content,
      categoryName: row.name,
      picture: row.picture,
      title: row.title,
      place: row.place,
      totalComments: row.total_comments,
      totalParticipations: row.total_participations,
      calendar: formattedDate(row.calendar),
      time: formattedTime(row.time),
      timestamp: formattedTimestamp(new Date(row.created_at)),
      user: {
        id: row.user_id,
        username: row.username,
        avatar: row.avatar_path,
      },
    }));

    return formattedRows;
  }
}

export default new UserEventRepository();
