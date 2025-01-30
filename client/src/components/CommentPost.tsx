import axios from "axios";
import { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useUpdate } from "../contexts/UpdateContext";
import type { Comment } from "../types/type";

interface CommentPostProps {
  postId: number;
}

export const CommentPost: React.FC<CommentPostProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { updateLike, updateComment } = useUpdate();

  useEffect(() => {
    const fetchCommentPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/${postId}/comments`,
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCommentPosts();

    if (updateComment || updateLike) {
      fetchCommentPosts();
    }
  }, [postId, updateLike, updateComment]);

  return (
    <div>
      {comments.length === 0 ? (
        <p>Aucun commentaire à afficher</p>
      ) : (
        comments.map((comments) => (
          <div key={comments.id} className="flex flex-col my-4">
            <p className="self-end text-xs">{comments.timestamp}</p>
            <div className="flex gap-4">
              <figure className="w-14">
                <Link to={`/user/profile/${comments.user.id}`}>
                  <img
                    src={comments.user.avatar}
                    alt={`Avatar de ${comments.user.username}`}
                    className="object-cover rounded-full size-12"
                  />
                </Link>
              </figure>
              <article className="w-full h-auto p-4 space-y-2 text-sm rounded-xl bg-bg-secondary text-text-secondary">
                <header className="flex items-start justify-between">
                  <p className="font-bold">{comments.user.username}</p>
                  <button type="button">
                    <SlOptions />
                  </button>
                </header>
                <main className="font-normal">{comments.content}</main>
              </article>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
