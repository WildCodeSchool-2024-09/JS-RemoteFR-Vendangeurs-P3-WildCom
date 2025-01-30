import axios from "axios";
import { useEffect, useState } from "react";

import { CardEvent } from "../components/CardEvent";

import { useUpdate } from "../contexts/UpdateContext";
import type { Event } from "../types/type";

function Events() {
  const [events, setEvents] = useState([] as Event[]);
  const { updateComment, updateEvent, updateParticipation } = useUpdate();

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

    if (updateComment || updateEvent || updateParticipation) {
      fetchEvents();
    }
  }, [updateComment, updateEvent, updateParticipation]);

  return (
    <section className="flex flex-col items-center flex-grow w-full gap-5 lg:gap-10">
      <CardEvent events={events} />
    </section>
  );
}

export default Events;
