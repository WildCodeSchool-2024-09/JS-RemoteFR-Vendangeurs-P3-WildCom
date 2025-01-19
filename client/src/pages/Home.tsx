import { useEffect, useState } from "react";

import { CardPost } from "../components/CardPost";

import type { Post } from "../types/type";

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
      <CardPost posts={posts} />
    </section>
  );
}

export default Home;
