import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
};

class AuthRepository {
  async readOneByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, email, password, is_admin AS isAdmin
      FROM user
      WHERE email = ?
      `,
      [email],
    );
    return rows[0] as User;
  }
}

export default new AuthRepository();
