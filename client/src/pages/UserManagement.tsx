import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminMobileNav } from "../components/Navigation/AdminMobileNav";

type User = {
  id: number;
  username: string;
  avatar: string;
  createdAt: string;
};

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users`,
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    };
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'utilisateur");
    }
  };

  return (
    <>
      <AdminMobileNav />
      <section className="relative z-10 w-screen flex flex-col h-auto gap-5 px-10 py-10  border-2 lg:w-4/5 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text  shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)] mx-auto">
        <p className="my-4 text-2xl text-center font-title text-text-primary">
          Gestion des utilisateurs
        </p>
        <form className="flex items-center justify-center mb-2">
          <input
            type="text"
            placeholder="Rechercher un utilisateur"
            className="p-2 rounded-l-lg w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="p-2 rounded-r-lg bg-accent-primary">
            <IoSearch className="size-6 text-text-primary" />
          </button>
        </form>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="relative flex flex-col items-center justify-between w-full gap-4 px-8 py-4 text-sm transition-opacity duration-200 ease-in-out lg:flex-row bg-bg-secondary opacity-85 hover:opacity-100 rounded-xl group"
          >
            <Link
              to={`/user/profile/${user.id}`}
              className="flex items-center justify-center gap-4"
            >
              <img
                src={user.avatar}
                alt={`Avatar de ${user.username}`}
                className="object-cover rounded-full size-12"
              />
              <p>{user.username}</p>
            </Link>

            {userToDelete === user.id ? (
              <div className="flex flex-col items-center justify-center gap-1">
                <p>Supprimer l'utilisateur ?</p>
                <div className="flex gap-3">
                  {/* Suppression */}
                  <button
                    type="button"
                    className="p-1 border rounded-md border-text-secondary"
                    onClick={() => {
                      handleDelete(user.id);
                      setUserToDelete(null);
                      setSearch("");
                    }}
                  >
                    <IoMdCheckmark />
                  </button>

                  {/* Annulation */}
                  <button
                    type="button"
                    className="p-1 border rounded-md border-text-secondary"
                    onClick={() => setUserToDelete(null)}
                  >
                    <RxCross2 />
                  </button>
                </div>
              </div>
            ) : (
              <p>{`Inscrit(e) depuis le ${user.createdAt}`}</p>
            )}

            <button
              type="button"
              className="absolute hidden p-1 rounded-full group-hover:flex -right-2 -top-2 bg-text-red"
              onClick={() => setUserToDelete(user.id)}
            >
              <RxCross2 className="size-4 text-text-primary" />
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
