import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

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
  };

  return (
    <>
      <div
        onClick={closeModal}
        onKeyUp={(e) => e.key === "Enter" && closeModal()}
        className="fixed inset-0 z-10 bg-bg_opacity-secondary backdrop-blur-sm"
      />
      <div className=" flex flex-col space-y-3 fixed z-20 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-10 rounded-xl bg-bg-primary gap-3 w-full md:w-2/3 lg:w-1/3 h-auto">
        <h2 className="text-text-primary flex justify-center font-title text-xl">
          Créer une publication
        </h2>
        <header className="flex items-center justify-between">
          <section className="flex items-center gap-2">
            <img
              src={user?.avatar}
              alt={user?.username}
              className="text-text-primary size-9 rounded-full"
            />
            <p className="text-base text-text-primary">{user?.username}</p>
          </section>
        </header>
        <form className="flex flex-col gap-4" action="">
          <textarea
            maxLength={65535}
            style={{ resize: "none" }}
            rows={6}
            className="p-4 space-y-2 text-sm rounded-xl text-text-secondary w-full"
            name=""
            placeholder="Rédigez une publication"
            id=""
            onChange={handlePostChange}
          />

          <select
            name="category"
            id="category"
            className="rounded-xl px-3 py-2"
            onChange={handleCategoryChange}
          >
            <option value="Divers">Divers</option>
            <option value="Job">Job</option>
            <option value="Tech">Tech</option>
          </select>
          <div className="flex justify-center gap-8 items-center">
            <button
              onClick={handlePublish}
              disabled={loading}
              type="submit"
              className="text-xl text-text-secondary bg-accent-primary hover:bg-accent-primaryhover mt-4 w-fit self-center px-6 py-2 rounded-xl font-text"
            >
              {loading ? "Publication..." : "Publier"}
            </button>
            <button
              className="text-xl text-accent-primary border border-accent-primary hover:text-accent-primaryhover hover:border-accent-primaryhover mt-4 w-fit self-center px-6 py-2 rounded-xl font-text"
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
          className="flex justify-center absolute top-0 right-2 w-7 h-7 bg-accent-primary hover:bg-accent-primaryhover text-bg-primary rounded-lg"
        >
          x
        </button>
      </div>
    </>
  );
}

export default PostModal;
