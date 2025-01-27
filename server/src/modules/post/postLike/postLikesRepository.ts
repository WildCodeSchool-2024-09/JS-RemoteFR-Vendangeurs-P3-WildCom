import type { Result } from "../../../../database/client";
import databaseClient from "../../../../database/client";

type NewPostLike = {
  userId: number;
  postId: number;
};

class PostLikesRepository {
  async create(newPostLike: NewPostLike) {
    const [result] = await databaseClient.query<Result>(
      `
        INSERT INTO post_like (post_id, user_id)
        VALUES (?, ?)
      `,
      [newPostLike.postId, newPostLike.userId],
    );

    return result.insertId;
  }
}

export default new PostLikesRepository();
