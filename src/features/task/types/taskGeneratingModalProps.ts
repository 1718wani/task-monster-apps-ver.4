import { type Task } from "@prisma/client";
import { type createTaskFormProps } from "./createTaskFormProps";

export type TaskGeneratingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  formProps: createTaskFormProps; // ここで正確な型を指定してください
  apiResponse: Task | undefined;
};
