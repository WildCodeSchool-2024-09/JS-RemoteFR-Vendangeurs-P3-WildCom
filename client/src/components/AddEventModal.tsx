import axios from "axios";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import defaultProfilePicture from "../assets/images/profil_neutral.webp";
import { useAuth } from "../contexts/AuthContext";
import { useUpdate } from "../contexts/UpdateContext";
import type { Category } from "../types/type";

interface EventModalProps {
  closeModal: () => void;
}

function AddEventModal({ closeModal }: EventModalProps) {
  const { user } = useAuth();
  const { setUpdateEvent } = useUpdate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [newEvent, setNewEvent] = useState({
    userId: user?.id as number | undefined,
    content: "",
    category: "",
    title: "",
    place: "",
    calendar: "",
    time: "",
  });

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

  const handleInputsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events`,
        {
          newEvent,
        },
        { withCredentials: true },
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        setUpdateEvent((prev) => prev + 1);
      }

      closeModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          toast.warn(error.response.data.error[0]);
        }
      }
    }
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
          <input
            type="text"
            name="title"
            placeholder="Titre de l'événement"
            className={"px-3 py-2 rounded-xl w-full"}
            onChange={handleInputsChange}
          />
          <input
            type="text"
            name="place"
            placeholder="Lieu"
            className={"px-3 py-2 rounded-xl w-full"}
            onChange={handleInputsChange}
          />
          <div className="flex gap-3">
            <div className="flex-col flex-1 space-y-3">
              <input
                type="date"
                name="calendar"
                min={new Date().toISOString().split("T")[0]}
                className={"px-3 py-2 rounded-xl w-full"}
                onChange={handleInputsChange}
              />
            </div>
            <div className="flex-col flex-1 space-y-3">
              <input
                name="time"
                type="time"
                className={"px-3 py-2 rounded-xl w-full"}
                onChange={handleInputsChange}
              />
            </div>
          </div>

          <TextareaAutosize
            maxLength={65535}
            minRows={6}
            name="content"
            id="content"
            className={
              "w-full p-4 space-y-2 text-sm resize-none max-h-96 scrollbar-custom rounded-xl text-text-secondary"
            }
            placeholder="Rédigez une publication"
            onChange={handleInputsChange}
          />

          <select
            name="category"
            id="category"
            className={"px-3 py-2 rounded-xl"}
            onChange={handleInputsChange}
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
