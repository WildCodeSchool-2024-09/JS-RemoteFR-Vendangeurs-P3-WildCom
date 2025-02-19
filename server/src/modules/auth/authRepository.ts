import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

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
      LEFT JOIN avatar ON avatar.id = user.avatar_id
      WHERE user.id = ? 
      `,
      [userId],
    );
    return rows[0];
  }

  async create(
    firstName: string,
    lastName: string,
    email: string,
    hashPassword: string,
  ) {
    const [result] = await databaseClient.query<Result>(
      `
          INSERT INTO user (firstname, lastname, email, password)
          VALUES (?, ?, ?, ?)
          `,
      [firstName, lastName, email, hashPassword],
    );
    const [rows] = await databaseClient.query<Rows>(
      `
          SELECT id, email
          FROM user
          WHERE id = ?
          `,
      [result.insertId],
    );

    return rows[0] as User;
  }
}

export default new AuthRepository();
