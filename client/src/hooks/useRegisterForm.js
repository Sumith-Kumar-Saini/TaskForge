import { useForm } from "react-hook-form";
import { useAppDispatch } from "./reduxHooks";
import { registerUser, clearError } from "@/features/authSlice";
import { useEffect } from "react";

export const useRegisterForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");

  // Clear any existing errors when form is used
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Add password confirmation validation
  useEffect(() => {
    form.register("confirmPassword", {
      required: "Please confirm your password",
      validate: (value) => value === password || "Passwords do not match",
    });
  }, [form, password]);

  const onSubmit = async (data) => {
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword: _confirmPassword, ...userData } = data;
      await dispatch(registerUser(userData)).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
