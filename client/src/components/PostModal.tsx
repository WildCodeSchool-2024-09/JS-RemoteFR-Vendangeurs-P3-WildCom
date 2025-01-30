import axios from "axios";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useAuth } from "../contexts/AuthContext";
import { useUpdate } from "../contexts/UpdateContext";

interface PostModalProps {
  closeModal: () => void;
}

function PostModal({ closeModal }: PostModalProps) {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState({
    userId: user?.id as number | undefined,
    content: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const { setUpdatePost } = useUpdate();

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
    if (!newPost.content.trim() || !newPost.userId) return;

    setLoading(true);
    if (newPost.content.length <= 0) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        {
          newPost,
        },
        { withCredentials: true },
      );

      closeModal();
    } catch (error) {
      console.error("Erreur lors de la publication", error);
    } finally {
      setLoading(false);
    }

    setUpdatePost((prev) => prev + 1);
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
          Créer une publication
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
        <form className="flex flex-col gap-4" action="">
          <TextareaAutosize
            maxLength={65535}
            minRows={6}
            className="w-full p-4 space-y-2 text-sm resize-none max-h-96 scrollbar-custom rounded-xl text-text-secondary"
            placeholder="Rédigez une publication"
            onChange={handlePostChange}
          />

          <select
            name="category"
            id="category"
            className="px-3 py-2 rounded-xl"
            onChange={handleCategoryChange}
          >
            <option value="Divers">Divers</option>
            <option value="Job">Job</option>
            <option value="Tech">Tech</option>
          </select>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={handlePublish}
              disabled={loading}
              type="submit"
              className="self-center px-6 py-2 mt-4 text-xl text-text-secondary bg-accent-primary hover:bg-accent-primaryhover w-fit rounded-xl font-text"
            >
              {loading ? "Publication..." : "Publier"}
            </button>
            <button
              className="self-center px-6 py-2 mt-4 text-xl border text-accent-primary border-accent-primary hover:text-accent-primaryhover hover:border-accent-primaryhover w-fit rounded-xl font-text"
              type="button"
              onClick={closeModal}
              disabled={loading}
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

export default PostModal;
