import About from "@/pages/About";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
