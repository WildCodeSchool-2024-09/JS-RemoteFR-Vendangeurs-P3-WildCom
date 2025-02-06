import type { ResultSetHeader } from "mysql2";
import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";
import { formattedDate } from "../../utils/formattedTimestamp";

type User = {
  id: number;
  username: string;
  avatar: string;
  link_github: string;
  link_linkedin: string;
  link_site: string;
  biography: string;
};

class userRepository {
  async browse() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
      id,
      CONCAT (firstname, ' ' ,lastname) as username,
      created_at,
      avatar
      FROM user
      WHERE role = 'user'
      `,
    );

    const fomrattedRows = rows.map((row) => ({
      id: row.id,
      username: row.username,
      avatar: row.avatar,
      createdAt: formattedDate(row.created_at),
    }));

    return fomrattedRows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
      id,
      CONCAT (firstname, ' ' ,lastname) as username,
      avatar,
      github,
      linkedin,
      site,
      biography 
      FROM user 
      WHERE id = ?`,
      [id],
    );
    return rows as User[];
  }

  async readUserInfo(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
      firstname,
      lastname,
      avatar,
      github,
      linkedin,
      site,
      biography 
      FROM user 
      WHERE id = ?`,
      [id],
    );
    return rows as User[];
  }

  async update(id: string, userData: Partial<User>) {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "UPDATE user SET ? WHERE id = ?",
      [userData, id],
    );
    if (result.affectedRows === 0) {
      return null;
    }
    const [updatedUser] = await databaseClient.query(
      "SELECT * FROM user WHERE id = ?",
      [id],
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
