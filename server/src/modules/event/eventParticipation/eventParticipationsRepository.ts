import type { Result, Rows } from "../../../../database/client";
import databaseClient from "../../../../database/client";

type EventParticipation = {
  userId: number;
  eventId: number;
};

class PostLikesRepository {
  async readLikesByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
        SELECT event_id
        FROM event_participation
        WHERE user_id = ? 
      `,
      [userId],
    );

    const participatedEvents = rows.map((row) => row.event_id);

    return participatedEvents;
  }

  async create(newEventParticipation: EventParticipation) {
    const [result] = await databaseClient.query<Result>(
      `
        INSERT INTO event_participation (event_id, user_id)
        VALUES (?, ?)
      `,
      [newEventParticipation.eventId, newEventParticipation.userId],
    );

    return result.insertId;
  }

  async delete(deletedEventParticipation: EventParticipation) {
    const [result] = await databaseClient.query<Result>(
      `
        DELETE 
        FROM event_participation
        WHERE user_id = ?
        AND event_id = ?
      `,
      [deletedEventParticipation.userId, deletedEventParticipation.eventId],
    );

    return result.affectedRows;
  }
}

export default new PostLikesRepository();
