// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

import { AuthAdmin } from "./components/Auth/AuthAdmin";
import { AuthUser } from "./components/Auth/AuthUser";
import Admin from "./pages/Admin";
import Events from "./pages/Events";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import Profil from "./pages/Profil";

/* ************************************************************************* */

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="login" />,
      },
      {
        path: "login",
        element: <Login />,
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
        ],
      },
      {
        path: "admin",
        element: <AuthAdmin />,
        children: [
          {
            path: "dashboard",
            element: <Admin />,
          },
        ],
      },
    ],
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
    <RouterProvider router={router} />
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
