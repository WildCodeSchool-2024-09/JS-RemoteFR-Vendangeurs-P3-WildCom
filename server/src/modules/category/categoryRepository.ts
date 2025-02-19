import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readById(categoryId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT * 
      FROM category
      WHERE id = ?
      `,
      [categoryId],
    );

    return rows[0];
  }
  async readByTypePost() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT * 
      FROM category
      WHERE type = 'post'
      `,
    );

    return rows;
  }

  async readByTypeEvent() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT * 
      FROM category
      WHERE type = 'event'
      `,
    );

    return rows;
  }

  async update(id: number, name: string) {
    const [result] = await databaseClient.query<Result>(
      `
      UPDATE category
      SET name = ?
      WHERE id = ? 
      `,
      [name, id],
    );

    return result;
  }

  async create(name: string, type: string) {
    const [result] = await databaseClient.query<Result>(
      `
      INSERT INTO category (name, type)
      VALUES (?, ?)
      `,
      [name, type],
    );

    return result;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      `
      DELETE FROM category
      WHERE id = ?
      `,
      [id],
    );

    return result;
  }
}

export default new CategoryRepository();
