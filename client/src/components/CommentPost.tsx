import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { useAuth } from "../contexts/AuthContext";
import { useUpdate } from "../contexts/UpdateContext";
import type { Comment } from "../types/type";

interface CommentPostProps {
  postId: number;
}

export const CommentPost: React.FC<CommentPostProps> = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );
  const [isEditingComment, setIsEditingComment] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState<string>("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { updateLike, updateComment, setUpdateComment } = useUpdate();

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

  const toggleCommentMenu = (commentId: number) => {
    setSelectedCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  const startEditingComment = (commentId: number, content: string) => {
    setIsEditingComment(commentId);
    setEditedCommentContent(content);
    setSelectedCommentId(null);
  };

  const cancelEditingComment = () => {
    setIsEditingComment(null);
    setEditedCommentContent("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedCommentId(null);
        setIsEditingComment(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const submitEditedComment = async (e: React.FormEvent, commentId: number) => {
    e.preventDefault();

    if (editedCommentContent.length <= 0) {
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/comments/${commentId}`,
        { content: editedCommentContent },
        { withCredentials: true },
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedCommentContent }
            : comment,
        ),
      );

      setSelectedCommentId(null);

      cancelEditingComment();
    } catch (error) {
      console.error("Erreur lors de la modification du commentaire", error);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/posts/comments/${commentId}`,
        { withCredentials: true },
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire", error);
    }
    setUpdateComment((prev) => prev + 1);
  };

  return (
    <div>
      {comments.length === 0 ? (
        <p>Aucun commentaire à afficher</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="flex flex-col my-4">
            <p className="self-end mr-2 text-xs">{comment.timestamp}</p>
            <div className="flex gap-4">
              <figure className="w-14">
                <Link to={`/user/profile/${comment.user.id}`}>
                  <img
                    src={comment.user.avatar}
                    alt={`Avatar de ${comment.user.username}`}
                    className="object-cover rounded-full size-12"
                  />
                </Link>
              </figure>

              <article className="w-full h-auto p-4 space-y-2 text-sm rounded-xl bg-bg-secondary text-text-secondary">
                <header className="relative flex items-start justify-between">
                  <p className="font-bold">{comment.user.username}</p>

                  {/* Bouton d'options */}
                  <button
                    type="button"
                    onClick={() => toggleCommentMenu(comment.id)}
                  >
                    <SlOptions />
                  </button>

                  {/* Menu d'actions */}
                  {selectedCommentId === comment.id && (
                    <div
                      ref={menuRef}
                      className="absolute flex items-center justify-center w-auto h-4 gap-3 m-2 text-xs font-medium right-5 -top-3 text-text-secondary font-text"
                    >
                      {(user?.id === comment.user.id ||
                        user?.role === "admin") && (
                        <>
                          {/* Bouton Modifier */}
                          <button
                            type="button"
                            className="flex items-center justify-center p-1 border rounded-md group border-bg-secondary hover:border-bg_opacity-secondary"
                            onClick={() =>
                              startEditingComment(comment.id, comment.content)
                            }
                          >
                            <FaPen className="size-3 group-hover:text-accent-primary" />
                          </button>

                          {/* Bouton Supprimer */}
                          <button
                            type="button"
                            className="flex items-center justify-center p-1 border rounded-md group border-bg-secondary hover:border-bg_opacity-secondary"
                            onClick={() => deleteComment(comment.id)}
                          >
                            <MdDeleteOutline className="size-4 group-hover:text-text-red" />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </header>

                {/* Contenu du commentaire */}
                <main className="h-auto font-normal">
                  {isEditingComment === comment.id ? (
                    <form
                      className="flex flex-col"
                      onSubmit={(e) => submitEditedComment(e, comment.id)}
                    >
                      <TextareaAutosize
                        className="w-full p-2 overflow-hidden resize-none rounded-xl "
                        onChange={(e) =>
                          setEditedCommentContent(e.target.value)
                        }
                        value={editedCommentContent}
                        autoFocus
                      />

                      <div className="flex items-center justify-end h-8 gap-4 mt-2 mr-1 ">
                        <button
                          type="button"
                          className="flex items-center justify-center w-6 h-6 rounded-md group hover:border border-bg_opacity-secondary"
                          onClick={cancelEditingComment}
                        >
                          <RxCross2 className="size-4 group-hover:text-[#ff0000]" />
                        </button>
                        <button
                          type="submit"
                          className="flex items-center justify-center w-6 h-6 rounded-md group hover:border border-bg_opacity-secondary"
                        >
                          <IoSendSharp className="size-4 text-accent-primary" />
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="break-all">{comment.content}</p>
                  )}
                </main>
              </article>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
