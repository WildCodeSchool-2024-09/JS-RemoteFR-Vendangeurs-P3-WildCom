import axios from "axios";
import { useEffect, useState } from "react";
import { BiCog } from "react-icons/bi";
import { FaPen, FaRegClock, FaRegCommentAlt } from "react-icons/fa";
import { LuCalendar, LuCalendarCheck2 } from "react-icons/lu";
import { MdDeleteOutline, MdWhereToVote } from "react-icons/md";
import { RxCalendar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import defaultProfilePicture from "../assets/images/default-avatar.png";
import { useAuth } from "../contexts/AuthContext";
import { useUpdate } from "../contexts/UpdateContext";
import type { Event } from "../types/type";
import { CommentEvent } from "./CommentEvent";
import ModalButton from "./ModalButton";
import { CommentInputEvent } from "./PostComment/CommentInputEvent";

interface CardEventProps {
  events: Event[];
}

export const CardEvent: React.FC<CardEventProps> = ({ events }) => {
  const { user } = useAuth();
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [participated, setParticipated] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [commentsVisibility, setCommentsVisibility] = useState<{
    [key: number]: boolean;
  }>({});
  const [isExpanded, setIsExpanded] = useState<{ [key: number]: boolean }>({});
  const { setUpdateParticipation, setUpdateEvent } = useUpdate();
  const [menuEventVisible, setMenuEventVisible] = useState<number | null>(null);

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
            withCredentials: true,
          },
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/events/${eventId}/participations`,
          {
            data: {
              userId: user?.id,
            },
            withCredentials: true,
          },
        );
      }

      setParticipated((prev) => ({
        ...prev,
        [eventId]: !prev[eventId],
      }));
    } catch (error) {}

    setUpdateParticipation((prev) => prev + 1);
  };

  const handleShowComments = (eventId: number) => {
    setCommentsVisibility((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
        {
          data: {
            path: events.find((event) => event.id === eventId)?.picture,
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setUpdateEvent((prev) => prev + 1);
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'événement");
    }
  };

  const toggleMenu = (eventId: number) => {
    setMenuEventVisible((prev) => (prev === eventId ? null : eventId));
  };

  const toggleExpansion = (postId: number) => {
    setIsExpanded((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <section className="flex flex-col items-center flex-grow w-full gap-5 lg:gap-10">
      {events.map((event) => (
        <article
          key={event.id}
          className="z-10 flex flex-col w-full h-auto gap-2 px-10 py-4 font-light border-2 lg:w-2/3 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]"
        >
          <header className="flex items-center justify-between py-2">
            <Link to={`/user/profile/${event.user.id}`}>
              <section className="flex items-center gap-2">
                <figure>
                  {event.user.avatar ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${event.user.avatar}`}
                      alt={`Avatar de ${user?.username}`}
                      className="object-cover rounded-full size-10 lg:size-12"
                    />
                  ) : (
                    <img
                      src={defaultProfilePicture}
                      alt={`Avatar de ${user?.username}`}
                      className="object-cover rounded-full size-10 lg:size-12"
                    />
                  )}
                </figure>
                <h2 id="username" className="text-sm lg:text-base">
                  {event.user.username}
                </h2>
              </section>
            </Link>

            <section className="flex items-center gap-4">
              <span className="text-xs lg:text-sm font-normal px-3 bg-[#176b1d]  border-2 border-accent-primary rounded">
                {event.categoryName}
              </span>
              {(user?.id === event.user.id || user?.role === "admin") && (
                <div className="relative flex items-center">
                  <button
                    onClick={() => {
                      toggleMenu(event.id);
                      setIsDeleteMode(false);
                    }}
                    type="button"
                  >
                    <figure className="p-1 transition-colors rounded-md bg-accent-secondary hover:bg-accent-primary">
                      <BiCog className="size-5 text-text-secondary" />
                    </figure>
                  </button>
                  {menuEventVisible === event.id && (
                    <div className="absolute z-50 w-40 bg-white border lg:-top-1 right-0 lg:-right-60 bg-text-secondary lg:bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-sm text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)] ">
                      {!isDeleteMode ? (
                        <>
                          <span className="flex w-full gap-2 px-4 py-2 text-left hover:text-accent-primary">
                            <FaPen className="w-5 text-accent-primary" />
                            <ModalButton
                              eventId={event.id}
                              type={"editEvent"}
                              onClose={() => setMenuEventVisible(null)}
                            >
                              Modifier
                            </ModalButton>
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsDeleteMode(true)}
                            className="flex w-full gap-2 px-4 py-2 text-left hover:text-text-red"
                          >
                            <MdDeleteOutline className="size-5 text-text-red " />
                            Supprimer
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-4 p-4">
                          <p className="text-center">
                            Voulez vous vraiment supprimer ?
                          </p>
                          <div className="flex justify-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="px-3 py-1 rounded-lg bg-text-red"
                            >
                              Oui
                            </button>

                            <button
                              type="button"
                              onClick={() => setIsDeleteMode(false)}
                              className="px-3 py-1 border rounded-lg border-accent-primary hover:text-accent-primary"
                            >
                              Non
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>
          </header>

          <main className="flex flex-col ">
            <section className="flex flex-col gap-3 lg:gap-0">
              {event.picture && (
                <img
                  src={`${import.meta.env.VITE_API_URL}/${event.picture}`}
                  alt=""
                  className="mb-4 rounded-md"
                />
              )}
              <article className="w-full space-y-3">
                <h2 className="text-xl font-semibold font-title">
                  {event.title}
                </h2>
                <div className="flex flex-wrap items-center justify-start gap-4 text-sm">
                  <div className="flex items-center order-1 space-x-2 lg:order-1">
                    <RxCalendar className="size-5 text-accent-primary" />
                    <p>Le {event.calendar}</p>
                  </div>
                  <div className="flex items-center justify-start order-3 space-x-2 md:order-2">
                    <FaRegClock className="size-5 text-accent-primary" />
                    <p>à {event.time}</p>
                  </div>
                  <div className="flex items-center justify-start order-2 space-x-2 md:order-3">
                    <MdWhereToVote className="size-6 text-accent-primary" />
                    <p className="text-sm font-text">
                      à <span>{event.place}</span>
                    </p>
                  </div>
                </div>
              </article>
            </section>
            <p className="mt-6 text-sm break-words whitespace-pre-line">
              {isExpanded[event.id]
                ? event.content
                : `${event.content.slice(0, 600)} ${event.content.length < 600 ? "" : "..."}`}
            </p>
            {event.content.length > 600 && (
              <button
                type="button"
                className="w-full mt-2 text-sm text-end font-text hobver:text-accent-primary"
                onClick={() => toggleExpansion(event.id)}
              >
                {isExpanded[event.id] ? "Réduire" : "Lire la suite"}
              </button>
            )}

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
              <>
                <CommentEvent eventId={event.id} />

                <section>
                  <CommentInputEvent eventId={event.id} />
                </section>
              </>
            )}
          </footer>
        </article>
      ))}
    </section>
  );
};
