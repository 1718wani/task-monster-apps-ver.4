import { type Task } from "@prisma/client";
import axios from "axios";
import { baseUrl } from "~/consts/url-paths";
import { axiosErrorHandler } from "~/util/error-handlers/axiosErrorHandler";

type updateNewSubTaskPropsType = {
  id: string;
  calculatedTotalTime: number;
};

export const UpdateNewSubTaskWithAxios = async ({id, calculatedTotalTime}:updateNewSubTaskPropsType) => {
  try {
    const response = await axios.put<Task>(`${baseUrl}/api/tasks/${id}`, {
      isOnGoing: true,
      totalMinutes: calculatedTotalTime,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = axiosErrorHandler(error.response, error);
      return errorMessage;
    } else {
      console.error("Error creating task:", error);
      return "タスクの更新中に原因不明のエラーが発生しました";
    }
  }
};
