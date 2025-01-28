import axios from "axios";
import { useEffect, useState } from "react";
import { BiCog } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { LuCalendar, LuCalendarCheck2 } from "react-icons/lu";
import { MdWhereToVote } from "react-icons/md";
import { RxCalendar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { Event } from "../types/type";
import { CommentEvent } from "./CommentEvent";
import { CommentInputEvent } from "./PostComment/CommentInputEvent";

interface CardEventProps {
  events: Event[];
}

export const CardEvent: React.FC<CardEventProps> = ({ events }) => {
  const { user } = useAuth();
  const [participated, setParticipated] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [commentsVisibility, setCommentsVisibility] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const getParticipations = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/events-participations`,
          {
            data: {
              userId: user?.id,
            },
          },
        );

        const participatedEvents = response.data.reduce(
          (acc: { [key: number]: boolean }, eventId: number) => {
            acc[eventId] = true;
            return acc;
          },
          {},
        );

        setParticipated(participatedEvents);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des participations",
          error,
        );
      }
    };

    if (user?.id) {
      getParticipations();
    }
  }, [user?.id]);

  const handleLike = async (eventId: number) => {
    try {
      if (participated[eventId]) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/events/${eventId}/participations`,
          {
            data: {
              userId: user?.id,
            },
          },
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/events/${eventId}/participations`,
          {
            data: {
              userId: user?.id,
            },
          },
        );
      }

      setParticipated((prev) => ({
        ...prev,
        [eventId]: !prev[eventId],
      }));
    } catch (error) {}
  };

  const handleShowComments = (eventId: number) => {
    setCommentsVisibility((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col items-center flex-grow w-full gap-5 lg:gap-10">
      {events.map((event) => (
        <article
          key={event.id}
          className="z-10 flex flex-col h-auto gap-2 px-10 py-4 font-light border-2 lg:w-2/3 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]"
        >
          <header className="flex items-center justify-between py-2">
            <Link to={`/user/profile/${event.user.id}`}>
              <section className="flex items-center gap-2">
                <figure>
                  <img
                    src={event.user.avatar}
                    alt=""
                    aria-labelledby="username"
                    className="object-cover rounded-full size-10 lg:size-12"
                  />
                </figure>
                <h2 id="username" className="text-sm lg:text-base">
                  {event.user.username}
                </h2>
              </section>
            </Link>

            <section className="flex items-center gap-4">
              <span className="text-xs lg:text-sm font-normal px-3 bg-[#176b1d]  border-2 border-accent-primary rounded">
                {event.category}
              </span>
              <button onClick={() => handleDeleteEvent(event.id)} type="button">
                <figure className="p-1 transition-colors rounded-md bg-accent-secondary hover:bg-accent-primary">
                  <BiCog className="size-5 text-text-secondary" />
                </figure>
              </button>
            </section>
          </header>

          <main className="flex flex-col ">
            <section className="flex flex-col gap-3 space-x-3 lg:flex-row lg:gap-0">
              {event.picture && (
                <figure className="lg:w-1/3">
                  <img src={event.picture} alt="" className="rounded-md l" />
                </figure>
              )}
              <article
                className={`${event.picture ? "lg:w-2/3" : "w-full"} space-y-3`}
              >
                <h2 className="text-xl font-semibold font-title">
                  {event.title}
                </h2>
                <div className="flex items-center space-x-1">
                  <RxCalendar className="size-5 text-accent-primary" />
                  <h2 className="text-xs">{event.calendar}</h2>
                </div>
                <div className="flex items-center space-x-1">
                  <MdWhereToVote className="size-5 text-accent-primary" />
                  <h2 className="text-sm font-title">
                    à <span>{event.place}</span>
                  </h2>
                </div>
              </article>
            </section>
            <p className="mt-6 text-sm">{event.content}</p>

            <hr className="mt-6 mb-4 border-accent-primary drop-shadow-[0_3px_2px_rgba(65,242,77,1)]" />
            <div className="flex justify-between">
              <p className="flex gap-1 text-xs">{event.timestamp}</p>

              <div className="flex items-center justify-center gap-6">
                <button
                  type="button"
                  className="flex items-center gap-3 text-sm group"
                  onClick={() => handleLike(event.id)}
                >
                  {participated[event.id] ? (
                    <LuCalendarCheck2 className="size-6 text-accent-primary" />
                  ) : (
                    <LuCalendar className="size-6 text-accent-secondary group-hover:text-accent-primary" />
                  )}
                  <span className="group-hover:text-accent-primary">
                    {event.totalParticipations}
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-3 text-sm group"
                  onClick={() => handleShowComments(event.id)}
                >
                  <FaRegCommentAlt className="size-5 fill-accent-secondary group-hover:fill-accent-primary" />
                  <span className="group-hover:text-accent-primary">
                    {event.totalComments}
                  </span>
                </button>
              </div>
            </div>
          </main>
          <footer
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              commentsVisibility[event.id]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {commentsVisibility[event.id] && (
              <CommentEvent eventId={event.id} />
            )}
            <section>
              {commentsVisibility[event.id] && (
                <CommentInputEvent eventId={event.id} />
              )}
            </section>
          </footer>
        </article>
      ))}
    </section>
  );
};
