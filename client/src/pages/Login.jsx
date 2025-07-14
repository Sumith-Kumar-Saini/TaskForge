import { useForm } from "react-hook-form";
import { useState } from "react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
    console.log("Login Submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-[90%] max-w-5xl shadow-lg bg-white rounded-lg overflow-hidden">
        {/* Left Illustration */}{" "}
        <div className="w-1/2 p-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6">Login to your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600 gap-2">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="accent-blue-600"
                />
                Remember Me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold shadow-sm transition"
            >
              Login
            </button>
          </form>

          {/* Submitted Data */}
          {submittedData && (
            <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
              <h4 className="font-semibold">Login Submitted:</h4>
              <pre className="text-sm mt-2">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </div>
        {/* Right Login Form */}
        <div className="w-1/2 bg-blue-100 flex items-center justify-center p-8">
          <img
            src="https://media.istockphoto.com/id/1351881158/vector/project-task-management-and-effective-time-planning-tools-project-development-icon-3d-vector.jpg?s=612x612&w=0&k=20&c=4WiIdOjNFAi8ZhOxSu1QQICvBC9lN0DU6hF93lSjlnw="
            alt="Login Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
