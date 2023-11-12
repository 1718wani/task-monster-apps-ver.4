import { TodoFormData } from "~/types/AllTypes";

export const validateTaskInput = (
  data: Partial<TodoFormData>
): { isValid: boolean; errors: Partial<TodoFormData> } => {
  const errors: Partial<TodoFormData> = {};

  if (!data.title) {
    errors.title = "Title is required";
  }

  // 他のフィールドもここで検証できます

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
