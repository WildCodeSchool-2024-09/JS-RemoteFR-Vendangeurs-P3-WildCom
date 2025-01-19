import { useEffect, useState } from "react";
import { BiCog } from "react-icons/bi";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  category: string;
  picture: string | null;
  content: string;
  timestamp: string;
  user: {
    id: number;
    username: string;
    avatar: string;
  };
};

function Home() {
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/posts`).then((response) =>
      response.json().then((data: Post[]) => {
        setPosts(data);
      }),
    );
  }, []);

  return (
    <section className="flex flex-col items-center flex-grow w-full gap-5 lg:gap-10">
      {posts.map((post) => (
        <article
          key={post.id}
          className="z-10 flex flex-col h-auto gap-2 px-10 py-4 font-light border-2 lg:w-2/3 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary "
        >
          <header className="flex items-center justify-between py-2">
            <Link to={`/profile/${post.user.id}`}>
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
                  <BiCog className="size-5 text-text-secondary" />
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
            <hr className="mt-6 mb-2 border-accent-primary" />
            <p className="flex gap-1 text-xs">{post.timestamp}</p>
          </main>
        </article>
      ))}
    </section>
  );
}

export default Home;
