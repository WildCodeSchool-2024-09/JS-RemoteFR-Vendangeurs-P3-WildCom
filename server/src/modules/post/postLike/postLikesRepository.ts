import type { Result, Rows } from "../../../../database/client";
import databaseClient from "../../../../database/client";

type PostLike = {
  userId: number;
  postId: number;
};

class PostLikesRepository {
  async readLikesByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
        SELECT post_id
        FROM post_like
        WHERE user_id = ? 
      `,
      [userId],
    );

    const likedPosts = rows.map((row) => row.post_id);

    return likedPosts;
  }

  async create(newPostLike: PostLike) {
    const [result] = await databaseClient.query<Result>(
      `
        INSERT INTO post_like (post_id, user_id)
        VALUES (?, ?)
      `,
      [newPostLike.postId, newPostLike.userId],
    );

    return result.insertId;
  }

  async delete(deletedPostLike: PostLike) {
    const [result] = await databaseClient.query<Result>(
      `
        DELETE 
        FROM post_like
        WHERE user_id = ?
        AND post_id = ?
      `,
      [deletedPostLike.userId, deletedPostLike.postId],
    );

    return result.affectedRows;
  }
}

export default new PostLikesRepository();
