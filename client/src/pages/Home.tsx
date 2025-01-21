import axios from "axios";
import { useEffect, useState } from "react";

import { CardPost } from "../components/CardPost";

import type { Post } from "../types/type";

function Home() {
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts`,
        );

        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="flex flex-col items-center flex-grow w-full gap-5 lg:gap-10">
      <CardPost posts={posts} />
    </section>
  );
}

export default Home;
