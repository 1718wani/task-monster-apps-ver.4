import {
  type UseFormRegister,
  type UseFormHandleSubmit,
  type FieldErrors,
  type Control,
  type UseFormGetValues,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import { type subTasksInputType } from "./subTasksInputType";

export type subTaskReactHookFormType = {
  control: Control<subTasksInputType>;
  register: UseFormRegister<subTasksInputType>;
  handleSubmit: UseFormHandleSubmit<subTasksInputType, undefined>;
  errors: FieldErrors<subTasksInputType>;
  isSubmitting: boolean;
  setValue: UseFormSetValue<subTasksInputType>;
  getValues: UseFormGetValues<subTasksInputType>;
  watch: UseFormWatch<subTasksInputType>;
};
