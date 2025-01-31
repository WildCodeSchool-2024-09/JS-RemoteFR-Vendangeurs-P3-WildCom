import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
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
}

export default new CategoryRepository();
