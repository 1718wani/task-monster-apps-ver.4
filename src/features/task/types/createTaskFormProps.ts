import {
  type UseFormRegister,
  type UseFormHandleSubmit,
  type FieldErrors,
} from "react-hook-form";
import { type taskCreateFormInput } from "./taskCreateFormInput";

export type createTaskFormProps = {
  register: UseFormRegister<taskCreateFormInput>;
  handleSubmit: UseFormHandleSubmit<taskCreateFormInput, undefined>;
  errors: FieldErrors<taskCreateFormInput>;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
 
};
