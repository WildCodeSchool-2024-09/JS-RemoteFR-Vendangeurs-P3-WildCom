import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CardPost } from "../components/CardPost";
import { useUpdate } from "../contexts/UpdateContext";
import type { Post } from "../types/type";

type User = {
  id: number;
  username: string;
  avatar: string;
  github: string | null;
  linkedin: string | null;
  site: string | null;
  biography: string | null;
};
function Profil() {
  const { id } = useParams();
  const [users, setUsers] = useState([] as User[]);
  const [posts, setPosts] = useState([] as Post[]);
  const { updatePost } = useUpdate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        );

        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/${id}/posts`,
        );
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (updatePost) {
      fetchPosts();
    }

    fetchPosts();
  }, [id, updatePost]);

  return (
    <>
      {users.map((user) => (
        <section
          key={user.id}
          className="relative z-10 flex flex-col gap-6 px-10 py-4 mx-0 border-2 rounded-xl bg-bg_opacity-primary border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]"
        >
          <div className="flex flex-col gap-6 mx-4 md:flex-row ">
            <div className="self-center">
              <img
                className="object-cover w-48 h-48 rounded-full"
                src={user.avatar}
                alt=""
                aria-labelledby="username"
              />
            </div>
            <p
              id="username"
              className="flex justify-center text-2xl font-bold md:hidden "
            >
              {user.username}
            </p>
            <div className="flex flex-col justify-center gap-8 ">
              <p className="hidden text-2xl font-bold md:flex ">
                {user.username}
              </p>
              <ul className="space-y-4">
                {user.github && (
                  <li className="font-bold">
                    Github :{" "}
                    <a
                      className="font-extralight hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] "
                      href={user.github}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {user.github}
                    </a>
                  </li>
                )}
                {user.linkedin && (
                  <li className="font-bold">
                    Linkedin :{" "}
                    <a
                      className="font-extralight hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
                      href={user.linkedin}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {user.linkedin}
                    </a>
                  </li>
                )}
                {user.site && (
                  <li className="font-bold">
                    Site :{" "}
                    <a
                      className="font-extralight hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
                      href={user.site}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {user.site}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div>
            {user.biography && (
              <div>
                <p className="ml-4 font-bold"> Biographie :</p>
                <p className="ml-4 italic font-extralight ">{user.biography}</p>
              </div>
            )}
          </div>
        </section>
      ))}
      <section className="flex justify-center mx-4 mt-8 posts">
        <CardPost posts={posts} />
      </section>
    </>
  );
}

export default Profil;
