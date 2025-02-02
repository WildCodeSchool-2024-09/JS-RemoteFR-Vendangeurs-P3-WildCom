import axios from "axios";
import { useEffect, useState } from "react";
import { BiCog } from "react-icons/bi";
import { FaHeart, FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUpdate } from "../contexts/UpdateContext";
import type { Post } from "../types/type";
import { CommentPost } from "./CommentPost";
import { CommentInputPost } from "./PostComment/CommentInputPost";

interface CardPostProps {
  posts: Post[];
}

export const CardPost: React.FC<CardPostProps> = ({ posts }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const [commentsVisibility, setCommentsVisibility] = useState<{
    [key: number]: boolean;
  }>({});

  const [menuPostVisible, setMenuPostVisible] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState<{ [key: number]: boolean }>({});
  const { setUpdateLike, setUpdatePost } = useUpdate();

  const toggleMenu = (postId: number) => {
    setMenuPostVisible((prev) => (prev === postId ? null : postId));
  };

  useEffect(() => {
    const getLikes = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/posts-likes`,
          {
            data: {
              userId: user?.id,
            },
            withCredentials: true,
          },
        );

        const likedPosts = response.data.reduce(
          (acc: { [key: number]: boolean }, postId: number) => {
            acc[postId] = true;
            return acc;
          },
          {},
        );

        setLiked(likedPosts);
      } catch (error) {
        console.error("Erreur lors de la récupération des likes", error);
      }
    };

    if (user?.id) {
      getLikes();
    }
  }, [user?.id]);

  const handleDeletePost = async (postId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
        {
          data: {
            userId: user?.id,
          },
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du post", error);
    }
    setUpdatePost((prev) => prev + 1);
  };

  const handleLike = async (postId: number) => {
    try {
      if (liked[postId]) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/posts/${postId}/likes`,
          {
            data: {
              userId: user?.id,
            },
            withCredentials: true,
          },
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/posts/${postId}/likes`,
          {
            data: {
              userId: user?.id,
            },
            withCredentials: true,
          },
        );
      }

      setLiked((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));
    } catch (error) {}

    setUpdateLike((prev) => prev + 1);
  };

  const handleShowComments = (postId: number) => {
    setCommentsVisibility((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleExpansion = (postId: number) => {
    setIsExpanded((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <>
      {posts.map((post) => (
        <article
          key={post.id}
          className="z-10 flex flex-col w-full h-auto gap-2 px-10 py-4 font-light border-2 lg:w-2/3 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]"
        >
          <header className="flex items-center justify-between py-2">
            <Link to={`/user/profile/${post.user.id}`}>
              <section className="flex items-center gap-4">
                <figure>
                  <img
                    src={post.user.avatar}
                    alt=""
                    aria-labelledby="username"
                    className="object-cover rounded-full size-12"
                  />
                </figure>
                <h2 id="username">{post.user.username}</h2>
              </section>
            </Link>

            <section className="flex items-center gap-4">
              {post.category && (
                <span className="text-sm font-normal px-3 bg-[#176b1d] border-2 border-accent-primary rounded">
                  {post.category}
                </span>
              )}
              <div className="relative flex items-center">
                <button type="button" onClick={() => toggleMenu(post.id)}>
                  <figure className="p-1 transition-colors rounded-md bg-accent-secondary hover:bg-accent-primary">
                    <BiCog className="text-text-secondary size-5" />
                  </figure>
                </button>
                {menuPostVisible === post.id && (
                  <div className="absolute z-50 w-40 bg-white border lg:-top-1 lg:-right-60 bg-text-secondary lg:bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)] right-0 ">
                    {(user?.id === post.user.id || user?.role === "admin") && (
                      <button
                        type="button"
                        onClick={() => handleDeletePost(post.id)}
                        className="right-0 flex w-full gap-2 px-4 py-2 text-sm text-left hover:text-text-red"
                      >
                        <MdDeleteOutline className="size-5 text-text-red " />
                        Supprimer
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          </header>

          <main className="flex flex-col">
            {post.picture && (
              <figure>
                <img
                  src={post.picture}
                  alt=""
                  className="object-cover rounded-md"
                />
              </figure>
            )}
            <div>
              <p className="mt-6 text-sm break-words whitespace-pre-line">
                {isExpanded[post.id]
                  ? post.content
                  : `${post.content.slice(0, 600)} ${post.content.length < 600 ? "" : "..."}`}
              </p>
              {post.content.length > 600 && (
                <button
                  type="button"
                  onClick={() => toggleExpansion(post.id)}
                  className="w-full mt-2 text-sm text-end font-text hover:text-accent-primary"
                >
                  {isExpanded[post.id] ? "Réduire" : "Lire la suite"}
                </button>
              )}
            </div>

            <hr className="mt-6 mb-4 border-accent-primary drop-shadow-[0_3px_2px_rgba(65,242,77,1)]" />
            <div className="flex justify-between">
              <p className="flex gap-1 text-xs ">{post.timestamp}</p>

              <div className="flex items-center justify-center gap-6">
                <button
                  type="button"
                  className="flex items-center gap-3 text-sm group"
                  onClick={() => handleLike(post.id)}
                >
                  {liked[post.id] ? (
                    <FaHeart className="size-5 fill-accent-primary" />
                  ) : (
                    <FaRegHeart className="size-5 fill-accent-secondary group-hover:fill-accent-primary" />
                  )}

                  <span className="group-hover:text-accent-primary">
                    {post.totalLikes}
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-3 text-sm group"
                  onClick={() => handleShowComments(post.id)}
                >
                  <FaRegCommentAlt className="size-5 fill-accent-secondary group-hover:fill-accent-primary" />
                  <span className="group-hover:text-accent-primary">
                    {post.totalComments}
                  </span>
                </button>
              </div>
            </div>
          </main>

          <footer
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              commentsVisibility[post.id]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {commentsVisibility[post.id] && <CommentPost postId={post.id} />}
            <section>
              {commentsVisibility[post.id] && (
                <CommentInputPost postId={post.id} />
              )}
            </section>
          </footer>
        </article>
      ))}
    </>
  );
};
