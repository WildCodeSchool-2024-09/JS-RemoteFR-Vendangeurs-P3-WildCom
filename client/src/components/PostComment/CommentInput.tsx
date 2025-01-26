import axios from "axios";
import { useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";

interface CommentInputProps {
  postId: number;
}

export const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
  const [comment, setComment] = useState({
    userId: 0,
    content: "",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;

    // Penser à mettre l'ID de l'utilisateur connecté
    setComment({
      userId: 1,
      content: newComment,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.content.trim()) {
      if (comment.content !== "") {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/posts/${postId}/comments`,
            comment,
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
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="relative flex flex-col mt-4">
        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            className="w-full p-3 italic font-normal border-t-0 border-b-0 resize-none rounded-xl pr-14 text-text-secondary"
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
