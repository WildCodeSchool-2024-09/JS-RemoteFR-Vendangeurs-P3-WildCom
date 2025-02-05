import axios from "axios";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
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
}

function EditPostModal({ closeModal, postId }: PostModalProps) {
  const { user } = useAuth();
  const { setUpdatePost } = useUpdate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [dataPost, setDataPost] = useState<DataPost | null>(null);

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

        setDataPost(response.data[0]);
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
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/${postId}/edit`,
        dataPost,
        {
          withCredentials: true,
        },
      );

      setUpdatePost((prev) => prev + 1);
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la modification de la publication", error);
    }
  };

  const sortedCategories = categories.sort((a, b) =>
    a.id === dataPost?.categoryId ? -1 : b.id === dataPost?.categoryId ? 1 : 0,
  );

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
        <header className="flex items-center justify-between">
          <section className="flex items-center gap-2">
            <img
              src={user?.avatar}
              alt={user?.username}
              className="object-cover rounded-full text-text-primary size-9"
            />
            <p className="text-base text-text-primary">{user?.username}</p>
          </section>
        </header>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextareaAutosize
            maxLength={65535}
            name="content"
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
