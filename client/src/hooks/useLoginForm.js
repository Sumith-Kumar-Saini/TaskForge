import { useForm } from "react-hook-form";
import { useAppDispatch } from "./reduxHooks";
import { loginUser, clearError } from "@/features/authSlice";
import { useEffect } from "react";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  // Clear any existing errors when form is used
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
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
