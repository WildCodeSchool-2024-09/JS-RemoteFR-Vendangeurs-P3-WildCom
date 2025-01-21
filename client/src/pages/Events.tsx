import axios from "axios";
import { useEffect, useState } from "react";

import { BiCog } from "react-icons/bi";
import { MdWhereToVote } from "react-icons/md";
import { RxCalendar } from "react-icons/rx";
import { Link } from "react-router-dom";

type Event = {
  id: number;
  content: string;
  category: string;
  picture: string | null;
  timestamp: string;
  title: string;
  place: string;
  calendar: string;
  user: {
    id: number;
    username: string;
    avatar: string;
  };
};

function Events() {
  const [events, setEvents] = useState([] as Event[]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events`,
        );

        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="flex flex-col items-center flex-grow w-full gap-5 lg:gap-10">
      {events.map((event) => (
        <article
          key={event.id}
          className="z-10 flex flex-col h-auto gap-2 px-10 py-4 font-light border-2 lg:w-2/3 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary "
        >
          <header className="flex items-center justify-between py-2">
            <Link to={`/profile/${event.user.id}`}>
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
              <button type="button">
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

            <hr className="mt-6 mb-2 border-accent-primary" />
            <p className="flex gap-1 text-xs">{event.timestamp}</p>
          </main>
        </article>
      ))}
    </section>
  );
}

export default Events;
