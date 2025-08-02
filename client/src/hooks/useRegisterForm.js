import { useForm } from "react-hook-form";

export const useRegisterForm = () => {
  const form = useForm();
  const password = form.watch("password");

  form.register("confirmPassword", {
    required: "Please confirm your password",
    validate: (value) => value === password || "Passwords do not match",
  });

  return form;
};