import { useLoginForm } from "@/hooks/useLoginForm";
import { useState } from "react";
import InputField from "@/components/InputField";
import AuthFormWrapper from "@/components/AuthFormWrapper";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => setSubmittedData(data);

  return (
    <AuthFormWrapper
      title={"Welcome Back"}
      subtitle={"Login to your account"}
      imageUrl={
        "https://media.istockphoto.com/id/1351881158/vector/project-task-management-and-effective-time-planning-tools-project-development-icon-3d-vector.jpg?s=612x612&w=0&k=20&c=4WiIdOjNFAi8ZhOxSu1QQICvBC9lN0DU6hF93lSjlnw="
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <InputField
          label="Email"
          type="email"
          registration={register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.email}
          placeholder="Enter your email"
        />

        <InputField
          label="Password"
          type="password"
          registration={register("password", {
            required: "Password is required",
          })}
          error={errors.password}
          placeholder="Enter your password"
        />

        <RememberMeRow register={register} />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-md font-semibold shadow-sm text-sm sm:text-base transition"
        >
          Login
        </button>
      </form>
      {submittedData && (
        <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-4 sm:p-5 rounded-md w-full overflow-x-auto">
          <h4 className="font-semibold text-sm sm:text-base">
            Form Submitted:
          </h4>
          <pre className="text-xs sm:text-sm mt-2 whitespace-pre-wrap break-words">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </AuthFormWrapper>
  );
}

// Remember Me + Forgot Password component for consistence
const RememberMeRow = ({ register, forgotLink = "#" }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 sm:gap-0 mt-2">
      <label className="flex items-center text-sm sm:text-base text-gray-600 gap-2">
        <input
          type="checkbox"
          {...register("remember")}
          className="accent-blue-600 w-4 h-4"
        />
        Remember Me
      </label>
      <a
        href={forgotLink}
        className="text-sm sm:text-base text-blue-600 hover:underline text-right"
      >
        Forgot Password?
      </a>
    </div>
  );
};
