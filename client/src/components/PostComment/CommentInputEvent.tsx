import axios from "axios";
import { useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { useAuth } from "../../contexts/AuthContext";
import { useUpdate } from "../../contexts/UpdateContext";

interface CommentInputProps {
  eventId: number;
}

export const CommentInputEvent: React.FC<CommentInputProps> = ({ eventId }) => {
  const [comment, setComment] = useState({
    userId: 0 as number | undefined,
    content: "",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useAuth();
  const { setUpdateComment } = useUpdate();

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;

    setComment({
      userId: user?.id,
      content: newComment,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.content.trim()) {
      if (comment.content !== "") {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/events/${eventId}/comments`,
            comment,
            { withCredentials: true },
          );
        } catch (error) {
          console.error(error);
        }
      }

      setComment({
        userId: 0,
        content: "",
      });

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      setUpdateComment((prev) => prev + 1);
    }
  };

  return (
    <div className="mx-1 mt-8">
      <form onSubmit={handleSubmit} className="relative flex flex-col mt-4">
        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            className="w-full p-3 mr-1 italic font-normal border-t-0 border-b-0 resize-none rounded-xl pr-14 text-text-secondary"
            rows={1}
            placeholder="Écrivez votre commentaire ici..."
            value={comment.content}
            onChange={handleCommentChange}
            onInput={handleInput}
          />
          <button
            type="submit"
            className="absolute flex items-center justify-center w-10 h-10 rounded-full text-accent-primary t bottom-2 right-2 "
          >
            <IoSendSharp className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};
