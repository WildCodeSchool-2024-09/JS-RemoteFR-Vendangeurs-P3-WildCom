import axios from "axios";
import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import defaultProfilePicture from "../assets/images/default-avatar.png";
import { useAuth } from "../contexts/AuthContext";
import { useUpdate } from "../contexts/UpdateContext";
import type { Category } from "../types/type";

interface EventModalProps {
  closeModal: () => void;
  eventId?: number;
}

interface DataEvent {
  userId: number;
  content: string;
  title: string;
  place: string;
  calendar: string;
  time: string;
  categoryId: number;
  categoryName: string;
  picture?: string;
  pictureId?: number;
}

function EditEventModal({ closeModal, eventId }: EventModalProps) {
  const { user } = useAuth();
  const { setUpdateEvent } = useUpdate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [dataEvent, setDataEvent] = useState<DataEvent>({
    userId: user?.id as number,
    content: "",
    categoryId: 0,
    title: "",
    place: "",
    calendar: "",
    time: "",
    categoryName: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<
    string | ArrayBuffer | File | null
  >(null);
  const [newImage, setNewImage] = useState<string | ArrayBuffer | File | null>(
    null,
  );

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

    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
        );
        if (response.data.length !== 0) {
          setDataEvent(response.data[0]);
          setCurrentImage(response.data[0]?.picture);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'événement",
          error,
        );
      }
    };

    fetchCategories();
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let updatedDataEvent = { ...dataEvent };

      if (newImage) {
        const pictureId = await uploadImage();
        if (pictureId) {
          updatedDataEvent = {
            ...updatedDataEvent,
            pictureId,
          };
        }
      }
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
        updatedDataEvent,
        {
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        toast.success(response.data.message);
      }

      setUpdateEvent((prev) => prev + 1);
      closeModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          toast.warn(error.response.data.error[0]);
        }
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setDataEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sortedCategories = categories.sort((a, b) =>
    a.id === dataEvent?.categoryId
      ? -1
      : b.id === dataEvent?.categoryId
        ? 1
        : 0,
  );

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("picture", newImage as File);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/uploads/pictures/event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        return response.data.id;
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image", error);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setNewImage(file);
    }
  };

  return (
    <>
      <div
        onClick={closeModal}
        onKeyUp={(e) => e.key === "Enter" && closeModal()}
        className="fixed inset-0 z-10 bg-bg_opacity-secondary backdrop-blur-sm"
      />
      <div className="fixed z-20 flex flex-col w-full gap-3 p-10 space-y-3 -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-[800px] top-1/2 left-1/2 rounded-xl bg-bg-primary md:w-2/3 lg:w-1/3">
        <h2 className="flex justify-center text-xl text-text-primary font-title">
          Modifier un événement
        </h2>
        <header
          className={`${imagePreview || currentImage ? "flex-col" : ""} flex items-start justify-between gap-4`}
        >
          <section className="flex items-center w-2/3 gap-2">
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

          <form className="flex w-full gap-3" encType="multipart/form-data">
            <div className="flex justify-center w-full">
              {imagePreview || currentImage ? (
                <div className="relative">
                  <img
                    src={
                      imagePreview
                        ? `${imagePreview}`
                        : `${import.meta.env.VITE_API_URL}/${currentImage}`
                    }
                    alt="Aperçu de l'image"
                    className="object-cover w-full max-h-96 rounded-xl"
                  />

                  <button
                    onClick={() => {
                      setCurrentImage(null);
                      setImagePreview(null);
                    }}
                    type="button"
                    className="absolute p-2 text-xl rounded-full cursor-pointer text-text-primary hover:text-accent-primary top-4 right-2 bg-bg-primary"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              ) : (
                <div className="flex justify-end w-full">
                  <label
                    className="self-end text-4xl cursor-pointer text-text-primary hover:text-accent-primary"
                    htmlFor="picture"
                  >
                    <BiImageAdd />
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    className="hidden"
                    id="picture"
                    name="picture"
                    type="file"
                    accept="image/*"
                  />
                </div>
              )}
            </div>
          </form>
        </header>

        <input
          type="text"
          id="title"
          placeholder="Titre de l'événement"
          className="w-full px-3 py-2 rounded-xl"
          onChange={handleInputChange}
          value={dataEvent?.title}
          name="title"
        />

        <input
          type="text"
          id="place"
          placeholder="Lieu"
          className="w-full px-3 py-2 rounded-xl"
          onChange={handleInputChange}
          name="place"
          value={dataEvent?.place}
        />

        <div className="flex gap-3">
          <div className="flex-col flex-1 space-y-3">
            <input
              type="date"
              id="calendar"
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-3 py-2 rounded-xl"
              onChange={handleInputChange}
              name="calendar"
              value={
                dataEvent?.calendar
                  ? new Date(dataEvent?.calendar).toISOString().split("T")[0]
                  : ""
              }
            />
          </div>

          <div className="flex-col flex-1 space-y-3">
            <input
              type="time"
              id="time"
              className="w-full px-3 py-2 rounded-xl"
              onChange={handleInputChange}
              name="time"
              value={dataEvent?.time}
            />
          </div>
        </div>

        <TextareaAutosize
          maxLength={65535}
          minRows={6}
          className="w-full p-4 space-y-2 text-sm resize-none min-h-32 scrollbar-custom rounded-xl text-text-secondary"
          placeholder="Rédigez une publication"
          onChange={handleInputChange}
          name="content"
          id="content"
          value={dataEvent?.content}
        />

        <select
          name="categoryId"
          id="categoryId"
          className="px-3 py-2 rounded-xl"
          onChange={handleInputChange}
          value={dataEvent?.categoryId || ""}
        >
          {sortedCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={handleSubmit}
            type="submit"
            className="self-center px-6 py-2 mt-4 text-xl text-text-secondary bg-accent-primary hover:bg-accent-primaryhover w-fit rounded-xl font-text"
          >
            Modifier
          </button>
          <button
            className="self-center px-6 py-2 mt-4 text-xl border text-accent-primary border-accent-primary hover:text-accent-primaryhover hover:border-accent-primaryhover w-fit rounded-xl font-text"
            type="button"
            onClick={closeModal}
          >
            Annuler
          </button>
        </div>

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

export default EditEventModal;
