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
  postId: number;
}

interface DataPost {
  id?: number;
  content?: string;
  categoryId?: number;
  categoryName?: string;
  picture?: string;
}

function EditPostModal({ closeModal, postId }: PostModalProps) {
  const { user } = useAuth();
  const { setUpdatePost } = useUpdate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [dataPost, setDataPost] = useState<DataPost | null>(null);
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

    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/${postId}`,
        );

        if (response.data.length !== 0) {
          setDataPost(response.data[0]);
          setImage(response.data[0]?.picture);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la publication",
          error,
        );
      }
    };

    fetchCategories();
    fetchPost();
  }, [postId]);

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setDataPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
        dataPost,
        {
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        if (image !== null) {
          await uploadImage(postId);
        }
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

  const sortedCategories = categories.sort((a, b) =>
    a.id === dataPost?.categoryId ? -1 : b.id === dataPost?.categoryId ? 1 : 0,
  );

  const uploadImage = async (postId: number) => {
    const formData = new FormData();
    formData.append("picture", image as File);
    formData.append("type", "post");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/uploads/pictures/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image", error);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
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
          Modifier une publication
        </h2>
        <header
          className={`${imagePreview || image ? "flex-col" : ""} flex items-start justify-between gap-4`}
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
            <div className="flex justify-center w-full ">
              {imagePreview || image ? (
                <div className="relative">
                  <figure className="flex lg:h-96">
                    <img
                      src={
                        imagePreview
                          ? `${imagePreview}`
                          : `${import.meta.env.VITE_API_URL}/${image}`
                      }
                      alt="Aperçu de l'image"
                      className="object-contain rounded-xl"
                    />
                  </figure>

                  <button
                    onClick={() => {
                      setImage(null);
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextareaAutosize
            maxLength={65535}
            name="content"
            id="content"
            className="w-full p-4 space-y-2 text-sm resize-none max-h-96 scrollbar-custom rounded-xl text-text-secondary"
            value={dataPost?.content}
            onChange={handleInputsChange}
          />

          <select
            name="categoryId"
            className="px-3 py-2 rounded-xl"
            onChange={handleInputsChange}
            value={dataPost?.categoryId || ""}
          >
            {sortedCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="flex items-center justify-center gap-8">
            <button
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

export default EditPostModal;
