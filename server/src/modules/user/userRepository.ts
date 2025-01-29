import type { ResultSetHeader } from "mysql2";
import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

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
}

export default new userRepository();
