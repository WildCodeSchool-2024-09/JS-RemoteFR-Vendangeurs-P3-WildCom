import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardPost } from "../components/CardPost";
import type { Post } from "../types/type";

type User = {
  id: number;
  username: string;
  avatar: string;
  github: string | null;
  linkedin: string | null;
  site: string | null;
  biography: string | null;
};

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // États pour les champs de modification
  const [username, setUsername] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [github, setGithub] = useState<string | null>(null);
  const [linkedin, setLinkedin] = useState<string | null>(null);
  const [site, setSite] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        );
        setUser(response.data);
        setUsername(response.data.username);
        setBiography(response.data.biography || "");
        setGithub(response.data.github);
        setLinkedin(response.data.linkedin);
        setSite(response.data.site);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur", error);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/${id}/posts`,
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des publications", error);
      }
    };

    fetchPosts();
  }, [id]);

  const handleSave = async () => {
    const updatedUser = { username, biography, github, linkedin, site };
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        updatedUser,
      );
      navigate(`/user/profile/${id}`);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des modifications", error);
    }
  };

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <section className="relative z-10 flex flex-col w-full max-w-3xl gap-6 p-8 mx-auto text-gray-800 bg-white border-2 border-gray-300 shadow-lg rounded-xl font-text">
      <div className="flex justify-center">
        <img
          className="object-cover w-48 h-48 border-4 border-gray-200 rounded-full"
          src={user.avatar}
          alt="User Avatar"
        />
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-md space-y-4 text-center">
          <label htmlFor="username" className="block text-lg font-semibold">
            Nom d'utilisateur :
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 text-center border rounded-md focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="github" className="block text-lg font-semibold">
            GitHub :
          </label>
          <input
            id="github"
            type="url"
            value={github || ""}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full p-2 text-center border rounded-md focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="linkedin" className="block text-lg font-semibold">
            LinkedIn :
          </label>
          <input
            id="linkedin"
            type="url"
            value={linkedin || ""}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full p-2 text-center border rounded-md focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="site" className="block text-lg font-semibold">
            Site web :
          </label>
          <input
            type="url"
            value={site || ""}
            onChange={(e) => setSite(e.target.value)}
            className="w-full p-2 text-center border rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="biography" className="block text-lg font-semibold">
            Biographie :
          </label>
          <textarea
            id="biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            className="w-full p-2 text-center border rounded-md focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        </div>
      </div>

      {/* Bouton Sauvegarder */}
      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
        >
          Sauvegarder
        </button>
      </div>

      {/* Posts */}
      <section className="flex flex-col mt-8">
        <h2 className="mb-4 text-2xl font-bold text-center">Publications</h2>
        <CardPost posts={posts} />
      </section>
    </section>
  );
}

export default EditProfile;
