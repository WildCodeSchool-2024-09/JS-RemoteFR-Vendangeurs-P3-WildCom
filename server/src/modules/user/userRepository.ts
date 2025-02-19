import type { ResultSetHeader } from "mysql2";
import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";
import { formattedDate } from "../../utils/formattedTimestamp";

type User = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  link_github: string;
  link_linkedin: string;
  link_site: string;
  biography: string;
  avatarId: number;
  avatarPath: string;
};

class userRepository {
  async browse() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
        user.id,
        CONCAT (firstname, ' ' ,lastname) as username,
        created_at,
        avatar.path
      FROM user
      LEFT JOIN avatar
      ON avatar.id = user.avatar_id
      WHERE role = 'user'
      `,
    );

    const formattedRows = rows.map((row) => ({
      id: row.id,
      username: row.username,
      avatar: row.path,
      createdAt: formattedDate(row.created_at),
    }));

    return formattedRows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
        user.id,
        CONCAT (firstname, ' ' ,lastname) as username,
        avatar.path AS avatarPath,
        avatar.id AS avatarId,
        github,
        linkedin,
        site,
        biography 
      FROM user 
      LEFT JOIN avatar
      ON avatar.id = user.avatar_id
      WHERE user.id = ?`,
      [id],
    );
    const formattedRows = rows.map((row) => ({
      id: row.id,
      username: row.username,
      avatarPath: row.avatarPath,
      avatarId: row.avatarId,
      github: row.github,
      linkedin: row.linkedin,
      site: row.site,
      biography: row.biography,
    }));

    return formattedRows;
  }

  async readUserInfo(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
        firstname,
        lastname,
        avatar.path AS avatarPath,
        avatar.id AS avatarId,
        github,
        linkedin,
        site,
        biography 
      FROM user 
      LEFT JOIN avatar
      ON avatar.id = user.avatar_id
      WHERE user.id = ?`,
      [id],
    );
    return rows as User[];
  }

  async update(
    userId: string,
    userData: {
      id: number;
      firstname: string;
      lastname: string;
      avatarId: number;
      github: string;
      linkedin: string;
      site: string;
      biography: string;
    },
  ) {
    const [result] = await databaseClient.query<ResultSetHeader>(
      `
      UPDATE user 
      SET firstname = ?, lastname = ?, avatar_id = ?, github = ?, linkedin = ?, site = ?, biography = ?
      WHERE id = ?`,
      [
        userData.firstname,
        userData.lastname,
        userData.avatarId,
        userData.github,
        userData.linkedin,
        userData.site,
        userData.biography,
        userId,
      ],
    );
    if (result.affectedRows === 0) {
      return null;
    }
    const [updatedUser] = await databaseClient.query(
      "SELECT * FROM user WHERE id = ?",
      [userId],
    );

    return updatedUser;
  }

  async destroy(id: number): Promise<boolean> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "DELETE FROM user WHERE id = ?",
      [id],
    );

    return result.affectedRows > 0;
  }
}

export default new userRepository();
