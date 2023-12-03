import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskValidation } from "~/schemas/zodSchema";
import { type taskCreateFormInput } from "../types/taskCreateFormInput";

export const useTaskCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<taskCreateFormInput>({
    resolver: zodResolver(taskValidation),
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
  };
};
