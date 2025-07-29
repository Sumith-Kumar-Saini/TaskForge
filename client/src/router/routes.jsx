import About from "@/pages/About";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import Features from "@/pages/Features"
import Usecases from "@/pages/Usecases"
import Pricing from "@/pages/Pricing"
import Roadmap from "@/pages/Roadmap"
import Contact from "@/pages/Contact"
import Signin from "@/pages/Signin"
import Getstarted from "@/pages/Getstarted"


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
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/features",
    element: <Features />
  },
  {
    path: "/use-cases",
    element: <Usecases />
  },
  {
    path: "/pricing",
    element: <Pricing />
  },
  {
    path: "/roadmap",
    element: <Roadmap />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/sign-in",
    element: <Signin />
  },
  {
    path: "/get-started",
    element: <Getstarted />
  }
];