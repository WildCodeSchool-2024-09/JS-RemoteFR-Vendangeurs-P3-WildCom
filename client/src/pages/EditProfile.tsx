import axios from "axios";
import { useEffect, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

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

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
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
        setFirstname(response.data.username);
        setLastname(response.data.username);
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

  const handleSave = async () => {
    const updatedUser = {
      firstname,
      lastname,
      biography,
      github,
      linkedin,
      site,
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        updatedUser,
      );
      navigate(`/user/profile/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <section className="relative z-10 flex flex-col w-full max-w-3xl gap-6 p-8 mx-auto border-2 lg:w-2/3 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text t shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]">
      <div className="flex flex-col items-center w-full">
        <form className="w-full max-w-md space-y-4 text-sm text-center">
          <label htmlFor="firstname" className="block text-lg font-semibold">
            Prénom :
          </label>
          <input
            id="firstname"
            type="text"
            defaultValue={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full p-2 text-center border rounded-xl focus:ring-2"
          />
          <label htmlFor="lastname" className="block text-lg font-semibold">
            Nom :
          </label>
          <input
            id="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full p-2 text-center border rounded-xl focus:ring-2"
          />
          <label htmlFor="github" className="block font-semibold ">
            GitHub :
          </label>
          <input
            id="github"
            type="text"
            value={github || ""}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full p-2 text-sm text-center border rounded-xl "
          />

          <label htmlFor="linkedin" className="block text-lg font-semibold ">
            LinkedIn :
          </label>
          <input
            id="linkedin"
            type="text"
            value={linkedin || ""}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full p-2 text-center border rounded-xl focus:ring-2 "
          />
          <label htmlFor="site" className="block text-lg font-semibold ">
            Site web :
          </label>
          <input
            type="text"
            value={site || ""}
            onChange={(e) => setSite(e.target.value)}
            className="w-full p-2 text-center border rounded-xl focus:ring-2 "
          />
          <label htmlFor="biography" className="block text-lg font-semibold ">
            Biographie :
          </label>
          <TextareaAutosize
            id="biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            className="w-full p-2 text-center border rounded-xl focus:ring-2 "
            minRows={3}
          />
        </form>
      </div>

      {/* Bouton Sauvegarder */}
      <button
        type="button"
        onClick={handleSave}
        className="flex items-center justify-center mt-6 hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
      >
        <CiSaveUp2 className="text-3xl font-bold text-accent-primary" />
        <span className="px-6 py-2 text-2xl text-text-primary font-text hover:text-accent-primary">
          Sauvegarder
        </span>
      </button>
    </section>
  );
}

export default EditProfile;
