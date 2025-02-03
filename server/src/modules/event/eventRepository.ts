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
        event.categoryId,
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

  async read(eventId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
      event.id AS event_id,
      event.content,
      event.picture,
      event.title,
      event.place,
      event.calendar,
      event.time,
      event.created_at,
      category.name AS category_name,
      category.id AS category_id,
      user.id AS user_id,
      CONCAT (user.firstname, ' ', user.lastname) AS username,
      user.avatar
      FROM event
      JOIN user
      ON event.user_id = user.id
      JOIN category
      ON event.category_id = category.id
      WHERE event.id = ?
      `,
      [eventId],
    );

    const formattedRows: EventWithUser[] = rows.map((row) => ({
      id: row.event_id,
      content: row.content,
      categoryName: row.category_name,
      categoryId: row.category_id,
      picture: row.picture,
      created_at: row.created_at,
      title: row.title,
      place: row.place,
      calendar: row.calendar,
      time: row.time,
      user: {
        id: row.user_id,
        username: row.username,
        avatar: row.avatar,
      },
    }));

    return formattedRows;
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
        avatar: row.avatar,
      },
    }));

    return formattedRows;
  }

  async update(event: Event) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE event
      SET content = ?, category_id = ?, picture = ?, title = ?, place = ?, calendar = ?, time = ? 
      WHERE id = ?`,
      [
        event.content,
        event.categoryId,
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
