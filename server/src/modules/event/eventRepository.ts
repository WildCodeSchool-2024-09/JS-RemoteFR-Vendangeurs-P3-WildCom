import databaseClient from "../../../database/client";
import formattedTimestamp from "../../utils/formattedTimestamp";

import type { Result, Rows } from "../../../database/client";

type Event = {
  id: number;
  content: string;
  category: string;
  picture: string;
  created_at?: Date;
  title: string;
  place: string;
  calendar: string;
  user_id?: number;
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
      `INSERT INTO event (content, category, picture, title, place, calendar, user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        event.content,
        event.category,
        event.picture,
        event.title,
        event.place,
        event.calendar,
        event.user_id,
      ],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(`
      SELECT user.id AS user_id,
      CONCAT (user.firstname, ' ', user.lastname) AS username,
      user.avatar,
      event.id AS event_id,
      event.content,
      event.category,
      event.picture,
      event.created_at,
      event.calendar,
      event.title,
      event.place
      FROM event
      JOIN user
      ON event.user_id = user.id
      `);

    const formattedRows: EventWithUser[] = rows.map((row) => ({
      id: row.event_id,
      content: row.content,
      category: row.category,
      picture: row.picture,
      title: row.title,
      place: row.place,
      calendar: formattedTimestamp(new Date(row.calendar)),
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
      SET content = ?, category = ?, picture = ?, title = ?, place = ?, calendar = ? 
      WHERE id = ?`,
      [
        event.content,
        event.category,
        event.picture,
        event.title,
        event.place,
        event.calendar,
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
