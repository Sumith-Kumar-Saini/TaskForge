import { useRegisterForm } from "@/hooks/useRegisterForm";
import { useState } from "react";
import InputField from "@components/InputField";
import RoleSelector from "@components/RoleSelector";
import AuthFormWrapper from "@components/AuthFormWrapper";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRegisterForm();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => setSubmittedData(data);

  return (
    <AuthFormWrapper
      title={"Create Account"}
      subtitle={"Start your journey with us"}
      imageUrl={
        "https://media.istockphoto.com/id/1351881158/vector/project-task-management-and-effective-time-planning-tools-project-development-icon-3d-vector.jpg?s=612x612&w=0&k=20&c=4WiIdOjNFAi8ZhOxSu1QQICvBC9lN0DU6hF93lSjlnw="
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <InputField
          label="Username"
          registration={register("username", {
            required: "Username is required",
          })}
          error={errors.username}
          placeholder="Enter your username"
        />

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
            minLength: { value: 6, message: "Min 6 characters" },
          })}
          error={errors.password}
          placeholder="Enter password"
        />

        <InputField
          label="Confirm Password"
          type="password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword}
          placeholder="Re-enter password"
        />

        <RoleSelector
          roles={["Developer", "Freelancer", "Product Manager"]}
          registration={register("role", { required: "Select a role" })}
          error={errors.role}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-md font-semibold shadow-sm text-sm sm:text-base transition"
        >
          Register
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-4 sm:p-5 rounded-md w-full overflow-x-auto">
          <h4 className="font-semibold text-sm sm:text-base">Form Submitted:</h4>
          <pre className="text-xs sm:text-sm mt-2 whitespace-pre-wrap break-words">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </AuthFormWrapper>
  );
}
