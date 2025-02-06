import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { useAuth } from "../contexts/AuthContext";
import { useUpdate } from "../contexts/UpdateContext";

type User = {
  id: number;
  username?: string;
  firstname: string;
  lastname: string;
  avatar: string;
  github: string;
  linkedin: string;
  site: string;
  biography: string;
};

function EditProfile() {
  const { user } = useAuth();
  const { setUpdateUser } = useUpdate();
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState<User | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setDataUser(
      (prevDataUser) =>
        ({
          ...prevDataUser,
          [name]: value,
        }) as User,
    );
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/${user?.id}/edit`,
          { withCredentials: true },
        );
        setDataUser(response.data[0]);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur", error);
      }
    };

    fetchUser();
  }, [user?.id]);

  const handleSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/${user?.id}`,
        dataUser,
        { withCredentials: true },
      );
      setUpdateUser((prev) => prev + 1);

      navigate(`/user/profile/${user?.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/${user?.id}`,
        { withCredentials: true },
      );
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression du compte", error);
    }
  };

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <section className="relative z-50 lg:mx-auto flex flex-col w-screen p-7 font-light border-2 lg:w-2/3 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-secondary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]">
        <div className="flex flex-col items-center w-full">
          <form className="w-full max-w-md space-y-8 text-sm font-text">
            <div className="">
              <label
                htmlFor="firstname"
                className="ml-2 text-lg font-text text-text-primary"
              >
                Prénom
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={dataUser?.firstname}
                onChange={handleChange}
                className="w-full p-2 font-text rounded-xl"
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="ml-2 text-lg text-text-primary font-text"
              >
                Nom
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={dataUser?.lastname}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="github"
                className="ml-2 text-lg text-text-primary font-text "
              >
                GitHub
              </label>
              <input
                id="github"
                name="github"
                type="text"
                value={dataUser?.github}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-xl "
              />
            </div>
            <div>
              <label
                htmlFor="linkedin"
                className="ml-2 text-lg text-text-primary font-text "
              >
                LinkedIn
              </label>
              <input
                id="linkedin"
                name="linkedin"
                type="text"
                value={dataUser?.linkedin}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl focus:ring-2 "
              />
            </div>
            <div>
              <label
                htmlFor="site"
                className="ml-2 text-lg text-text-primary font-text "
              >
                Site web
              </label>
              <input
                id="site"
                name="site"
                type="text"
                value={dataUser?.site}
                onChange={handleChange}
                className="w-full p-2 rounded-xl"
              />
            </div>
            <div>
              <label
                htmlFor="biography"
                className="justify-center ml-2 text-lg text-text-primary font-text"
              >
                Biographie
              </label>
              <TextareaAutosize
                id="biography"
                name="biography"
                value={dataUser?.biography}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl "
                minRows={3}
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center gap-8 mt-4">
          <button
            type="submit"
            className="self-center px-6 py-2 mt-4 text-xl text-text-secondary bg-accent-primary hover:bg-accent-primaryhover w-fit rounded-xl font-text"
            onClick={handleSave}
          >
            Modifier
          </button>
          <button
            className="self-center px-6 py-2 mt-4 text-xl border text-accent-primary border-accent-primary hover:text-accent-primaryhover hover:border-accent-primaryhover w-fit rounded-xl font-text"
            type="button"
            onClick={() => navigate(`/user/profile/${user?.id}`)}
          >
            Annuler
          </button>
        </div>
      </section>
      <section className="relative z-50 flex justify-center w-screen font-light lg:mx-auto p-7 lg:w-2/3 text-text-secondary ">
        {showConfirm ? (
          <div className="self-center p-8 mt-4 text-xl border-2 border-bg_opacity-secondary rounded-xl text-accent-primary font-text shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]">
            <p className="text-lg text-center text-text-primary">
              Êtes-vous sûr(e) de vouloir supprimer votre compte ?
            </p>
            <div className="flex justify-center gap-4 mt-4 ">
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 text-xl font-medium text-bg-secondary bg-text-red rounded-xl "
              >
                Oui
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 text-xl font-medium border text-accent-primary border-accent-primary hover:text-accent-primaryhover hover:border-accent-primaryhover w-fit rounded-xl font-text"
              >
                Non
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="self-center px-6 py-2 mt-4 text-xl font-bold border bg-text-red hover:text-gray-800 text-text-primary border-text-red w-fit rounded-xl font-text shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]"
          >
            Supprimer mon compte
          </button>
        )}
      </section>
    </>
  );
}

export default EditProfile;
