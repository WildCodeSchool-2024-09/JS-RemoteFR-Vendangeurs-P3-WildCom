import databaseClient from "../../../database/client";
import {
  formattedDate,
  formattedTime,
  formattedTimestamp,
} from "../../utils/formattedTimestamp";

import type { Result, Rows } from "../../../database/client";

type Event = {
  id: number;
  content: string;
  category: number;
  picture: string;
  created_at?: Date;
  title: string;
  place: string;
  calendar: string;
  time: string;
  userId?: number;
};

type User = {
  id: number;
  username: string;
  avatar: string;
};

type EventWithUser = Omit<Event, "user_id"> & {
  user: User;
};

class EventRepository {
  async create(event: Omit<Event, "id">) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO event (content, category_id, picture, title, place, calendar, time, user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        event.content,
        event.category,
        event.picture,
        event.title,
        event.place,
        event.calendar,
        event.time,
        event.userId,
      ],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(`
      SELECT 
        event.id AS event_id,
        event.content,
        category.name,
        event.picture,
        event.created_at,
        event.calendar,
        event.time,
        event.title,
        event.place,
        user.id AS user_id,
        CONCAT (user.firstname, ' ', user.lastname) AS username,
        user.avatar,
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
      ORDER BY
        event.created_at DESC;
      `);

    const formattedRows: EventWithUser[] = rows.map((row) => ({
      id: row.event_id,
      content: row.content,
      category: row.name,
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
        avatar: row.avatar,
      },
    }));

    return formattedRows;
  }

  async update(event: Event) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE event
      SET content = ?, category = ?, picture = ?, title = ?, place = ?, calendar = ?, time = ? 
      WHERE id = ?`,
      [
        event.content,
        event.category,
        event.picture,
        event.title,
        event.place,
        event.calendar,
        event.time,
        event.id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      `DELETE FROM event 
      WHERE id = ?`,
      [id],
    );

    return result.affectedRows;
  }
}

export default new EventRepository();
