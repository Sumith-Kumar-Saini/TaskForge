import { useForm } from "react-hook-form";
import { useState } from "react";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [submittedData, setSubmittedData] = useState(null);
  const password = watch("password");

  const onSubmit = (data) => {
    setSubmittedData(data);
    console.log("Submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-[90%] max-w-6xl shadow-lg bg-white rounded-lg overflow-hidden">
        {/* Left Illustration */}
        <div className="w-1/2 bg-blue-100 flex items-center justify-center p-8">
          <img
            src="https://media.istockphoto.com/id/1351881158/vector/project-task-management-and-effective-time-planning-tools-project-development-icon-3d-vector.jpg?s=612x612&w=0&k=20&c=4WiIdOjNFAi8ZhOxSu1QQICvBC9lN0DU6hF93lSjlnw="
            alt="Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Right Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6">Start your journey with us</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                {...register("username", { required: "Username is required" })}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
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
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Re-enter password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Role Radio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="flex flex-wrap gap-4">
                {["Developer", "Freelancer", "Product Manager"].map((role) => (
                  <label key={role} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={role}
                      {...register("role", { required: "Select a role" })}
                      className="accent-blue-600"
                    />
                    {role}
                  </label>
                ))}
              </div>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold shadow-sm transition"
            >
              Register
            </button>
          </form>

          {/* Submitted Data Preview */}
          {submittedData && (
            <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
              <h4 className="font-semibold">Form Submitted:</h4>
              <pre className="text-sm mt-2">{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
