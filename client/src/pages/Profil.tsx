import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CardEvent } from "../components/CardEvent";
import { CardPost } from "../components/CardPost";
import { useUpdate } from "../contexts/UpdateContext";
import type { Event, Post } from "../types/type";

import defaultProfilePicture from "../assets/images/default-avatar.png";

type User = {
  id: number;
  username: string;
  github: string | null;
  linkedin: string | null;
  site: string | null;
  biography: string | null;
  path: string | null;
};

function Profil() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "events">("posts");
  const {
    updatePost,
    updateEvent,
    updateComment,
    updateLike,
    updateParticipation,
  } = useUpdate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        );

        setUser(response.data[0]);
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

    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/${id}/events`,
        );

        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (updateEvent || updateComment || updateParticipation) {
      fetchEvents();
    }

    if (updatePost || updateComment || updateLike) {
      fetchPosts();
    }

    fetchPosts();
    fetchEvents();
  }, [
    id,
    updatePost,
    updateEvent,
    updateComment,
    updateLike,
    updateParticipation,
  ]);

  return (
    <>
      <section
        key={user?.id}
        className="relative z-10 flex flex-col gap-6 px-10 py-4 mx-0 border-2 rounded-xl bg-bg_opacity-primary border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]"
      >
        <div className="flex flex-col gap-6 mx-4 md:flex-row">
          <figure className="self-center w-52">
            {user?.path ? (
              <img
                className="object-cover w-48 h-48 rounded-full"
                src={`${import.meta.env.VITE_API_URL}/${user.path}`}
                alt={`Avatar de ${user?.username}`}
              />
            ) : (
              <img
                className="object-cover w-48 h-48 rounded-full"
                src={defaultProfilePicture}
                alt={`Avatar de ${user?.username}`}
              />
            )}
          </figure>

          <p
            id="username"
            className="flex justify-center text-2xl font-bold break-all md:hidden"
          >
            {user?.username}
          </p>
          <div className="flex flex-col justify-center w-3/4 gap-8">
            <p className="hidden text-2xl font-bold break-all md:flex">
              {user?.username}
            </p>
            <ul className="space-y-4">
              {user?.github && (
                <li className="font-bold break-all">
                  Github :{" "}
                  <a
                    className="font-extralight hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
                    href={user?.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {user?.github}
                  </a>
                </li>
              )}
              {user?.linkedin && (
                <li className="font-bold break-all">
                  Linkedin :{" "}
                  <a
                    className="font-extralight hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
                    href={user?.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {user?.linkedin}
                  </a>
                </li>
              )}
              {user?.site && (
                <li className="font-bold break-all">
                  Site :{" "}
                  <a
                    className="font-extralight hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
                    href={user?.site}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {user?.site}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div>
          {user?.biography && (
            <div>
              <p className="ml-4 font-bold">Biographie :</p>
              <p className="ml-4 italic break-all font-extralight">
                {user?.biography}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-8 mt-8 lg:mx-4">
        <header className="flex justify-around rounded-lg w-screen lg:w-2/3 bg-bg_opacity-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)] z-10 font-text text-text-primary font-normal">
          <button
            type="button"
            onClick={() => setActiveTab("posts")}
            className={`w-full py-3 border rounded-l-lg border-bg_opacity-secondary ${activeTab === "posts" ? "text-accent-primary" : ""}`}
          >
            Publications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("events")}
            className={`w-full py-3 border rounded-r-lg border-bg_opacity-secondary ${activeTab === "events" ? "text-accent-primary" : ""}`}
          >
            Événements
          </button>
        </header>
        {activeTab === "posts" && <CardPost posts={posts} />}
        {posts.length === 0 && activeTab === "posts" && (
          <p className="text-text-primary">Aucune publication à afficher</p>
        )}
        {activeTab === "events" && <CardEvent events={events} />}
        {events.length === 0 && activeTab === "events" && (
          <p className="text-text-primary">Aucun événement à afficher</p>
        )}
      </section>
    </>
  );
}

export default Profil;
