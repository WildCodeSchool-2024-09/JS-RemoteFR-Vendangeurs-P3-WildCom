import axios from "axios";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import defaultProfilePicture from "../assets/images/default-avatar.png";
import { useAuth } from "../contexts/AuthContext";
import { useUpdate } from "../contexts/UpdateContext";
import type { Comment } from "../types/type";

interface CommentEventProps {
  eventId: number;
}

export const CommentEvent: React.FC<CommentEventProps> = ({ eventId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );
  const [isDeleteMode, setIsDeleteMode] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [isExpanded, setIsExpanded] = useState<{ [key: number]: boolean }>({});
  const [isEditingComment, setIsEditingComment] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState<string>("");
  const { updateComment, setUpdateComment } = useUpdate();

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

    if (updateComment) {
      fetchCommentEvents();
    }
  }, [eventId, updateComment]);

  const toggleCommentMenu = (commentId: number) => {
    setSelectedCommentId((prevId) => (prevId === commentId ? null : commentId));

    setIsDeleteMode({});
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

  const submitEditedComment = async (e: React.FormEvent, commentId: number) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/events/comments/${commentId}`,
        { content: editedCommentContent },
        { withCredentials: true },
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: editedCommentContent }
              : comment,
          ),
        );

        setSelectedCommentId(null);

        cancelEditingComment();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          toast.warn(error.response.data.error[0]);
        }
      }
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/posts/comments/${commentId}`,
        { withCredentials: true },
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId),
        );
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression du commentaire");
    }
    setUpdateComment((prev) => prev + 1);
  };

  const toggleDeleteMode = (commentId: number) => {
    setIsDeleteMode((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const toggleExpansion = (postId: number) => {
    setIsExpanded((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
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
                  {comment.user.avatar ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${comment.user.avatar}`}
                      alt={`Avatar de ${comment.user.username}`}
                      className="object-cover rounded-full size-12"
                    />
                  ) : (
                    <img
                      src={defaultProfilePicture}
                      alt={`Avatar de ${comment.user.username}`}
                      className="object-cover rounded-full size-12"
                    />
                  )}
                </Link>
              </figure>

              <article className="w-full h-auto p-4 space-y-2 text-sm rounded-xl bg-bg-secondary text-text-secondary">
                <header className="relative flex items-start justify-between">
                  <p className="font-bold">{comment.user.username}</p>

                  {/* Bouton d'options */}
                  {(user?.id === comment.user.id || user?.role === "admin") && (
                    <>
                      {/* Menu d'actions */}
                      {isDeleteMode[comment.id] ? (
                        <div className="absolute flex gap-1 right-6 -top-1 ">
                          <p className="self-center mr-1">Suppirmer ?</p>
                          <button
                            type="button"
                            onClick={() => deleteComment(comment.id)}
                            className="p-1 border rounded-lg border-bg-secondary hover:border-bg_opacity-secondary hover:text-text-red"
                          >
                            <IoMdCheckmark />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleDeleteMode(comment.id)}
                            className="p-1 border rounded-lg border-bg-secondary hover:border-bg_opacity-secondary hover:text-accent-primary"
                          >
                            <RxCross1 />
                          </button>
                        </div>
                      ) : (
                        <div>
                          {selectedCommentId === comment.id && (
                            <div className="absolute flex items-center justify-center w-auto h-4 gap-1 m-2 text-xs font-medium right-4 -top-3 text-text-secondary font-text">
                              {/* Bouton Modifier */}
                              <button
                                type="button"
                                className="flex items-center justify-center p-1 border rounded-md group border-bg-secondary hover:border-bg_opacity-secondary"
                                onClick={() =>
                                  startEditingComment(
                                    comment.id,
                                    comment.content,
                                  )
                                }
                              >
                                <FaPen className="size-3 group-hover:text-accent-primary" />
                              </button>

                              {/* Bouton Supprimer */}
                              <button
                                type="button"
                                className="flex items-center justify-center p-1 border rounded-md group border-bg-secondary hover:border-bg_opacity-secondary"
                                onClick={() => toggleDeleteMode(comment.id)}
                              >
                                <MdDeleteOutline className="size-4 group-hover:text-text-red" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          toggleCommentMenu(comment.id);
                        }}
                      >
                        <SlOptions />
                      </button>
                    </>
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
                    <>
                      <p className="break-words whitespace-pre-line">
                        {isExpanded[comment.id]
                          ? comment.content
                          : `${comment.content.slice(0, 400)} ${comment.content.length > 400 ? "..." : ""}`}
                      </p>
                      {comment.content.length > 400 && (
                        <button
                          type="button"
                          onClick={() => toggleExpansion(comment.id)}
                          className="w-full mt-2 text-sm text-end hover:text-accent-primary"
                        >
                          {isExpanded[comment.id] ? "Réduire" : "Lire la suite"}
                        </button>
                      )}
                    </>
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
