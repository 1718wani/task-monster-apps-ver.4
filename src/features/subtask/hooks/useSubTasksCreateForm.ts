import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { subTaskValidation } from "~/schemas/zodSchema";
import { type subTasksInputType } from "../types/subTasksInputType";

export const useSubTaskCreateForm = () => {
  const defaultTasks = Array(3).fill({ subTaskTitle: "", estimatedMinutes: 15 });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm<subTasksInputType>({
    defaultValues: { subTasks: defaultTasks },
    resolver: zodResolver(subTaskValidation),
  });

  return {
    control,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    getValues,
    watch,
  };
};
