import axios from "axios";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import defaultProfilePicture from "../../assets/images/profil_neutral.webp";
import { useAuth } from "../contexts/AuthContext";
import { useUpdate } from "../contexts/UpdateContext";
import type { Category } from "../types/type";

interface EventModalProps {
  closeModal: () => void;
}

function AddEventModal({ closeModal }: EventModalProps) {
  const { user } = useAuth();
  const { setUpdateEvent } = useUpdate();

  const [newEvent, setNewEvent] = useState({
    userId: user?.id as number | undefined,
    content: "",
    category: "",
    title: "",
    place: "",
    calendar: "",
    time: "",
  });

  const [missContent, setMissContent] = useState("");
  const [missCategory, setMissCategory] = useState("");
  const [missDate, setMissDate] = useState("");
  const [missTime, setMissTime] = useState("");
  const [missPlace, setMissPlace] = useState("");
  const [missTitle, setMissTitle] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories/events`,
        );

        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEventChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;

    setNewEvent({
      ...newEvent,
      content: newContent,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewEvent({ ...newEvent, category: e.target.value });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, title: e.target.value });
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, place: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, calendar: e.target.value });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, time: e.target.value });
  };

  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (newEvent.title === "") {
      setMissTitle("Veuillez choisir un titre");
      return;
    }
    if (newEvent.place === "") {
      setMissPlace("Veuillez choisir un lieu");
      return;
    }
    if (newEvent.calendar === "") {
      setMissDate("Veuillez choisir une date");
      return;
    }
    if (newEvent.time === "") {
      setMissTime("Veuillez choisir une heure");
      return;
    }
    if (newEvent.content === "") {
      setMissContent("Veuillez rédiger une publication");
      return;
    }
    if (newEvent.category === "") {
      setMissCategory("Veuillez choisir une catégorie");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events`,
        {
          newEvent,
        },
        { withCredentials: true },
      );

      closeModal();
    } catch (error) {
      console.error("Erreur lors de la publication", error);
    }

    setUpdateEvent((prev) => prev + 1);
  };

  return (
    <>
      <div
        onClick={closeModal}
        onKeyUp={(e) => e.key === "Enter" && closeModal()}
        className="fixed inset-0 z-10 bg-bg_opacity-secondary backdrop-blur-sm"
      />
      <div className="fixed z-20 flex flex-col w-full h-auto gap-3 p-10 space-y-3 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-xl bg-bg-primary md:w-2/3 lg:w-1/3">
        <h2 className="flex justify-center text-xl text-text-primary font-title">
          Créer un événement
        </h2>
        <header className="flex items-center justify-between">
          <section className="flex items-center gap-2">
            {user?.path ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/${user?.path}`}
                alt={user?.username}
                className="object-cover rounded-full text-text-primary size-9"
              />
            ) : (
              <img
                src={defaultProfilePicture}
                alt={user?.username}
                className="object-cover rounded-full text-text-primary size-9"
              />
            )}
            <p className="text-base text-text-primary">{user?.username}</p>
          </section>
        </header>
        <form className="flex flex-col gap-4" action="">
          {missTitle && <p className="text-xs text-text-red">{missTitle}</p>}
          <input
            type="text"
            placeholder="Titre de l'événement"
            className={`${missTitle ? " border-2 border-text-red " : ""}px-3 py-2 rounded-xl w-full`}
            onChange={handleTitleChange}
          />
          {missPlace && <p className="text-xs text-text-red">{missPlace}</p>}
          <input
            type="text"
            placeholder="Lieu"
            className={`${missPlace ? " border-2 border-text-red " : ""}px-3 py-2 rounded-xl w-full`}
            onChange={handlePlaceChange}
          />
          <div className="flex gap-3">
            <div className="flex-col flex-1 space-y-3">
              {missDate && <p className="text-xs text-text-red">{missDate}</p>}
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className={`${missDate ? " border-2 border-text-red " : ""}px-3 py-2 rounded-xl w-full`}
                onChange={handleDateChange}
              />
            </div>
            <div className="flex-col flex-1 space-y-3">
              {missTime && <p className="text-xs text-text-red">{missTime}</p>}
              <input
                type="time"
                className={`${missTime ? " border-2 border-text-red " : ""}px-3 py-2 rounded-xl w-full`}
                onChange={handleTimeChange}
              />
            </div>
          </div>
          {missContent && (
            <p className="text-xs text-text-red">{missContent}</p>
          )}
          <TextareaAutosize
            maxLength={65535}
            minRows={6}
            className={`${missContent ? " border-2 border-text-red " : ""}w-full p-4 space-y-2 text-sm resize-none max-h-96 scrollbar-custom rounded-xl text-text-secondary`}
            placeholder="Rédigez une publication"
            onChange={handleEventChange}
          />
          {missCategory && (
            <p className="text-xs text-text-red">{missCategory}</p>
          )}
          <select
            name="category"
            id="category"
            className={`${missCategory ? " border-2 border-text-red " : ""}px-3 py-2 rounded-xl`}
            onChange={handleCategoryChange}
          >
            <option value="">Choisissez une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={handlePublish}
              type="submit"
              className="self-center px-6 py-2 mt-4 text-xl text-text-secondary bg-accent-primary hover:bg-accent-primaryhover w-fit rounded-xl font-text"
            >
              Publier
            </button>
            <button
              className="self-center px-6 py-2 mt-4 text-xl border text-accent-primary border-accent-primary hover:text-accent-primaryhover hover:border-accent-primaryhover w-fit rounded-xl font-text"
              type="button"
              onClick={closeModal}
            >
              Annuler
            </button>
          </div>
        </form>

        <button
          type="button"
          onClick={closeModal}
          className="absolute top-0 flex justify-center rounded-lg right-2 w-7 h-7 bg-accent-primary hover:bg-accent-primaryhover text-bg-primary"
        >
          x
        </button>
      </div>
    </>
  );
}

export default AddEventModal;
