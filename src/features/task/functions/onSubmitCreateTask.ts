import axios from "axios";
import type { taskCreateFormInput } from "../types/taskCreateFormInput";
import { axiosErrorHandler } from "~/util/error-handlers/axiosErrorHandler";
import toast from "react-hot-toast";
import { type Task } from "@prisma/client";

export const onSubmitCreateTask = async (
  userId: string,
  data: taskCreateFormInput
) => {
  try {
    const response = await axios.post<Task>("api/task", {
      userId: userId,
      title: data.title,
      detail: data.detail,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = axiosErrorHandler(error.response, error);
      toast.error(message);
    } else {
      console.error("Error creating task:");
      toast.error("タスクの作成に失敗しました。");
    }
  }
};
