import type { Result } from "../../../database/client";
import databaseClient from "../../../database/client";

class UploadRepository {
  async createAvatar(filename: string, path: string) {
    const result = await databaseClient.query<Result>(
      `
      INSERT INTO avatar (filename, path)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
      filename = ?,
      path = ?
      `,
      [filename, path, filename, path],
    );

    return { id: result[0].insertId };
  }

  async createPicturePost(filename: string, path: string) {
    const result = await databaseClient.query<Result>(
      `
      INSERT INTO post_picture (filename, path)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
      filename = ?,
      path = ?
      `,
      [filename, path, filename, path],
    );

    return { id: result[0].insertId };
  }

  async createPictureEvent(filename: string, path: string) {
    const result = await databaseClient.query<Result>(
      `
      INSERT INTO event_picture (filename, path)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
      filename = ?,
      path = ?
      `,
      [filename, path, filename, path],
    );

    return { id: result[0].insertId };
  }

  async deletePicture(pictureId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM post_picture WHERE id = ?",
      [pictureId],
    );
    return result.affectedRows;
  }
}

export default new UploadRepository();
