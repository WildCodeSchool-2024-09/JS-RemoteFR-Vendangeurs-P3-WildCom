import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { Category } from "../types/type";

export const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const getCategory = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/categories/${id}`,
        { withCredentials: true },
      );
      setCategory(response.data);
    };

    getCategory();
  }, [id]);

  return (
    <div className=" relative z-10 w-screen flex flex-col h-auto gap-10 p-10  font-light border-2 lg:w-2/3 lg:mx-auto bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]">
      <h2 className="text-lg text-center font-title lg:text-xl">
        Que voulez vous faire ?
      </h2>
      <input
        className="w-1/2 px-3 py-2 mx-auto text-sm rounded-lg text-text-secondary"
        value={category?.name}
        name="name"
        onChange={(e) =>
          setCategory((prevCategory) => ({
            ...prevCategory,
            name: e.target.value,
            id: prevCategory?.id ?? 0,
          }))
        }
      />

      <div className="flex justify-center gap-5 font-medium font-text text-text-secondary">
        <button
          type="button"
          className="px-3 py-1 rounded-lg bg-accent-primary hover:bg-accent-primaryhover "
        >
          Modifier
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded-lg bg-text-red hover:bg-text-red hover:opacity-60"
          onClick={async () => {
            try {
              const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/categories/${id}`,
                { withCredentials: true },
              );

              if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/admin/categories");
              }
            } catch (error) {
              if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                  toast.error(error.response.data.message);
                }
              }
            }
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};
