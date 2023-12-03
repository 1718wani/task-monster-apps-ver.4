import { type SubTask } from "@prisma/client";
import { type subTaskInputType } from "../types/subTaskInputType";
import axios from "axios";
import { baseUrl } from "~/consts/url-paths";
import { axiosErrorHandler } from "~/util/error-handlers/axiosErrorHandler";

export const PostNewSubTaskWithAxios = async (
  taskId: string,
  data: subTaskInputType
) => {
  try {
    const response = await axios.post<SubTask>(`${baseUrl}/api/subtask`, {
      taskId: Number(taskId),
      title: data.subTaskTitle,
      estimatedMinutes: data.estimatedMinutes,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = axiosErrorHandler(error.response, error);
      return errorMessage;
    } else {
      console.error("Error creating task:", error);
      return "サブタスクの作成中に原因不明のエラーが発生しました";
    }
  }
};
