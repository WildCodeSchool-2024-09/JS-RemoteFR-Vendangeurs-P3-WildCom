import axios from "axios";
import { useEffect, useState } from "react";

import { CardPost } from "../components/CardPost";

import { IoMdAdd } from "react-icons/io";
import ModalButton from "../components/ModalButton";
import { useUpdate } from "../contexts/UpdateContext";
import type { Post } from "../types/type";

function Home() {
  const [posts, setPosts] = useState([] as Post[]);
  const { updateLike, updatePost, updateComment } = useUpdate();

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

    if (updateLike || updatePost || updateComment) {
      fetchPosts();
    }
  }, [updateLike, updatePost, updateComment]);

  return (
    <section className="flex flex-col items-center flex-grow w-full gap-5 lg:gap-10">
      <div className="group lg:hidden">
        <ModalButton type={"post"}>
          <IoMdAdd className="rounded-full bg-accent-primary text-text-secondary size-8" />
        </ModalButton>
      </div>
      <CardPost posts={posts} />
    </section>
  );
}

export default Home;
