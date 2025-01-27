import { useState } from "react";
import { BiCog } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Post } from "../types/type";
import { CommentPost } from "./CommentPost";
import { CommentInputPost } from "./PostComment/CommentInputPost";

interface CardPostProps {
  posts: Post[];
}

export const CardPost: React.FC<CardPostProps> = ({ posts }) => {
  const [commentsVisibility, setCommentsVisibility] = useState<{
    [key: number]: boolean;
  }>({});

  const handleShowComments = (postId: number) => {
    setCommentsVisibility((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <>
      {posts.map((post) => (
        <article
          key={post.id}
          className="z-10 flex flex-col h-auto gap-2 px-10 py-4 font-light border-2 lg:w-2/3 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]"
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
              <span className="text-sm font-normal px-3 bg-[#176b1d]  border-2 border-accent-primary rounded">
                {post.category}
              </span>
              <button type="button">
                <figure className="p-1 transition-colors rounded-md bg-accent-secondary hover:bg-accent-primary">
                  <BiCog className="text-text-secondary size-5" />
                </figure>
              </button>
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
            <p className="mt-6 text-sm">{post.content}</p>
            <hr className="mt-6 mb-2 border-accent-primary drop-shadow-[0_3px_2px_rgba(65,242,77,1)]" />
            <div className="flex justify-between">
              <p className="flex gap-1 text-xs ">{post.timestamp}</p>

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
