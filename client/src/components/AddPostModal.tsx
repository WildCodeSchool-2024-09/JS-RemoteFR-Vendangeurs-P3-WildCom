import axios from "axios";
import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import defaultProfilePicture from "../assets/images/profil_neutral.webp";
import { useAuth } from "../contexts/AuthContext";
import { useUpdate } from "../contexts/UpdateContext";
import type { Category } from "../types/type";

interface PostModalProps {
  closeModal: () => void;
}

function AddPostModal({ closeModal }: PostModalProps) {
  const { user } = useAuth();
  const [imageUploaded, setImageUploaded] = useState({
    id: 0,
    path: "",
  });

  const [newPost, setNewPost] = useState({
    userId: user?.id as number | undefined,
    content: "",
    category: "",
    pictureId: null,
  });

  const { setUpdatePost } = useUpdate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<string | ArrayBuffer | File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories/posts`,
        );

        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    fetchCategories();
  }, []);

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;

    setNewPost({
      ...newPost,
      content: newContent,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewPost({ ...newPost, category: e.target.value });
  };

  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        {
          newPost,
        },
        { withCredentials: true },
      );

      if (response.status === 201) {
        toast.success(response.data.message);
      }

      setUpdatePost((prev) => prev + 1);
      closeModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          toast.warn(error.response.data.error[0]);
        }
      }
    }
  };

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("picture", image as File);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/uploads/pictures/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        const pictureId = response.data.id;
        setImageUploaded(response.data);

        setNewPost({
          ...newPost,
          pictureId: pictureId,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image", error);
    }
  };

  const handleDeleteImage = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/uploads/pictures/post/${imageUploaded?.id}`,
        { data: { path: imageUploaded?.path }, withCredentials: true },
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image", error);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      await uploadImage(file);
    }
  };

  return (
    <>
      <div
        onClick={closeModal}
        onKeyUp={(e) => e.key === "Enter" && closeModal()}
        className="fixed inset-0 z-10 bg-bg_opacity-secondary backdrop-blur-sm"
      />
      <div className="fixed z-20 flex flex-col w-full max-h-[800px] gap-3 p-10 space-y-3 overflow-y-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-xl bg-bg-primary md:w-2/3 lg:w-1/3">
        <h2 className="flex justify-center text-xl text-text-primary font-title">
          Créer une publication
        </h2>
        <header
          className={`${imagePreview ? "flex-col" : ""} flex items-start justify-between gap-4`}
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
          <form className="flex w-full gap-3 " encType="multipart/form-data">
            <div className="flex justify-center w-full">
              {image !== null && (
                <div className="relative">
                  <img
                    src={imagePreview || ""}
                    alt="Aperçu de l'image"
                    className="object-cover w-full max-h-96 rounded-xl"
                  />

                  <button
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                      handleDeleteImage();
                    }}
                    type="button"
                    className="absolute p-2 text-xl rounded-full cursor-pointer text-text-primary hover:text-accent-primary top-4 right-2 bg-bg-primary"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              )}
              {image === null && (
                <div className="flex justify-end w-full">
                  <label
                    className="text-4xl cursor-pointer text-text-primary hover:text-accent-primary"
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
        <form className="flex flex-col gap-4" action="">
          <TextareaAutosize
            maxLength={65535}
            minRows={6}
            name="content"
            id="content"
            className={
              "w-full p-4 space-y-2 text-sm resize-none max-h-96 scrollbar-custom rounded-xl text-text-secondary"
            }
            placeholder="Rédigez une publication"
            onChange={handlePostChange}
          />

          <select
            name="category"
            id="category"
            className={"px-3 py-2 rounded-xl"}
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

export default AddPostModal;
