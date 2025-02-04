import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CategoryForm } from "../components/Categories/CategoryForm";
import { AdminMobileNav } from "../components/Navigation/AdminMobileNav";
import { useUpdate } from "../contexts/UpdateContext";

type Category = {
  id: number;
  name: string;
};

export default function CategoryIndex() {
  const { updateCategories, setUpdateCategories } = useUpdate();
  const [categories, setCategories] = useState({
    posts: [] as Category[],
    events: [] as Category[],
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const postCategories = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories/posts`,
        );
        const eventCategories = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories/events`,
        );

        setCategories({
          posts: postCategories.data,
          events: eventCategories.data,
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (updateCategories) {
      getCategories();
    }

    getCategories();
  }, [updateCategories]);

  return (
    <>
      <AdminMobileNav />

      <div className="flex flex-col justify-center gap-4">
        {/* Publications */}
        <div className=" relative z-10 w-screen flex flex-col h-auto gap-10 p-10  font-light border-2 lg:w-2/3 lg:mx-auto bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]">
          <h2 className="text-lg text-center font-title lg:text-xl">
            Catégories - Publications
          </h2>

          <ul className="flex flex-wrap gap-5 ">
            {categories.posts.map((category) => (
              <Link to={`/admin/categories/${category.id}`} key={category.id}>
                <li className="text-sm font-normal px-2 bg-[#176b1d] border-2 border-accent-primary rounded">
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
          <CategoryForm
            onSubmit={async (postCategoriesData) => {
              try {
                const response = await axios.post(
                  `${import.meta.env.VITE_API_URL}/api/categories`,
                  postCategoriesData,
                  { withCredentials: true },
                );

                if (response.status === 200) {
                  toast.success(response.data.message);
                  setUpdateCategories((prev) => prev + 1);
                }
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                  }
                }
              }
            }}
            type="post"
          />
        </div>

        {/* Événements */}
        <div className=" relative z-10 w-screen flex flex-col h-auto gap-10 p-10 font-light border-2 lg:w-2/3 lg:mx-auto bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]">
          <h2 className="text-lg text-center font-title lg:text-xl">
            Catégories - Événements
          </h2>

          <ul className="flex flex-wrap gap-5 ">
            {categories.events.map((category) => (
              <Link to={`/admin/categories/${category.id}`} key={category.id}>
                <li className="text-sm font-normal px-2 bg-[#176b1d] border-2 border-accent-primary rounded">
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
          <CategoryForm
            onSubmit={async (postCategoriesData) => {
              try {
                const response = await axios.post(
                  `${import.meta.env.VITE_API_URL}/api/categories`,
                  postCategoriesData,
                  { withCredentials: true },
                );

                if (response.status === 200) {
                  toast.success(response.data.message);
                  setUpdateCategories((prev) => prev + 1);
                }
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                  }
                }
              }
            }}
            type="event"
          />
        </div>
      </div>
    </>
  );
}
