import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Profil = {
  username: string;
  avatar: string;
  link_github: string;
  link_linkedin: string;
  link_site: string;
  biography: string;
};

class profilRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
      CONCAT (firstname, ' ' ,lastname) as username,
      avatar,
      link_github,
      link_linkedin,
      link_site,
      biography 
      FROM user 
      WHERE id = ?`,
      [id],
    );
    return rows as Profil[];
  }
}

export default new profilRepository();
