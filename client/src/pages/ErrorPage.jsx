import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="w-full h-screen bg-zinc-950 flex justify-center items-center">
      <div className="p-8 text-center">
        <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
        <p className="mt-4 text-white text-2xl">Something went wrong.</p>
        <p className="text-md text-gray-500 mt-2">
          {error?.status === 404
            ? "404 - Page not found."
            : error?.message || "An unexpected error occurred."}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
