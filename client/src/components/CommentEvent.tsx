import axios from "axios";
import { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import type { Comment } from "../types/type";

interface CommentEventProps {
  eventId: number;
}

export const CommentEvent: React.FC<CommentEventProps> = ({ eventId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchCommentEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events/${eventId}/comments`,
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCommentEvents();
  }, [eventId]);

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
                <img
                  src={comments.user.avatar}
                  alt={`Avatar de ${comments.user.username}`}
                  className="object-cover rounded-full size-12"
                />
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
