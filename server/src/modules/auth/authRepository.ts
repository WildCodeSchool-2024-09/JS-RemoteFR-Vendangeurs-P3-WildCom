import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  password: string;
  avatar?: string;
  username?: string;
  role?: string;
};

class AuthRepository {
  async readOneByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, email, password
      FROM user
      WHERE email = ?
      `,
      [email],
    );
    return rows[0] as User;
  }

  async readById(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT user.id, CONCAT(firstname, " ", lastname) AS username, role, avatar.path
      FROM user
      JOIN avatar ON avatar.user_id = user.id
      WHERE user.id = ? 
      `,
      [userId],
    );

    return rows[0] as User;
  }
}

export default new AuthRepository();
