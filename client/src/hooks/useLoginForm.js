import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  return useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });
};
