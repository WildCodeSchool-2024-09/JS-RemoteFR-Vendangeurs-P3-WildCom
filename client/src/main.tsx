// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component

import { ToastContainer } from "react-toastify";
import { AuthAdmin } from "./components/Auth/AuthAdmin";
import { AuthUser } from "./components/Auth/AuthUser";
import { AuthProvider } from "./contexts/AuthContext";
import { UpdateProvider } from "./contexts/UpdateContext";
import NotFound from "./pages/404";
import { AuthPage } from "./pages/AuthPage";
import { CategoryDetails } from "./pages/CategoryDetails";
import CategoryIndex from "./pages/CategoryIndex";
import EditProfile from "./pages/EditProfile";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import { UserManagement } from "./pages/UserManagement";

/* ************************************************************************* */

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "user",
    element: <AuthUser />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "profile/:id",
        element: <Profil />,
      },
      {
        path: "profile/edit/:id",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "admin",
    element: <AuthAdmin />,
    children: [
      {
        path: "categories",
        element: <CategoryIndex />,
      },
      {
        path: "categories/:id",
        element: <CategoryDetails />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <UpdateProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UpdateProvider>
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
