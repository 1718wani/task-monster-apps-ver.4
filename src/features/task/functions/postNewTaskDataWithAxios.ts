import { type Task } from "@prisma/client";
import axios from "axios";
import { type taskCreateFormInput } from "../types/taskCreateFormInput";
import { axiosErrorHandler } from "~/util/error-handlers/axiosErrorHandler";
import { baseUrl } from "~/consts/url-paths";

export const PostNewTaskDataWithAxios = async (
  userId: string,
  data: taskCreateFormInput
) => {
  try {
    const response = await axios.post<Task>(`${baseUrl}/api/task`, {
      userId: userId,
      title: data.title,
      detail: data.detail,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = axiosErrorHandler(error.response, error);
      return errorMessage;
    } else {
      console.error("Error creating task:", error);
      return "タスクの作成中に原因不明のエラーが発生しました";
    }
  }
};
