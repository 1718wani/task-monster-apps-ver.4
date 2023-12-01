import router from "next/router";
import toast from "react-hot-toast";
import { UpdateNewSubTaskWithAxios } from "~/features/task/functions/updateTaskDataWithAxios";
import { type subTasksInputType } from "../types/subTasksInputType";
import { calculateTotalMinutesOfSubTasks } from "./calculateTotalMinutesOfSubTasks";
import { PostNewSubTaskWithAxios } from "./postNewSubTaskWithAxios";
import { type subTaskReactHookFormType } from "../types/subTaskReactHookFormType";

export const onSubmitSubTasksForm = async (
  data: subTasksInputType,
  id: string|undefined,
  imageurl: string|undefined,
  subTasksForm: subTaskReactHookFormType
) => {
  if (id === undefined) {
    toast.error("このタスクは存在しません。");
    return;
  }
  for (const subTask of data.subTasks) {
    const response = await PostNewSubTaskWithAxios(id, subTask);
    if (response && typeof response === "object" && "title" in response) {
      console.log(response, "無事サブタスク作成レスポンスが返されました");
    } else {
      toast.error(response);
    }
  }

  const calculatedTotalTime = calculateTotalMinutesOfSubTasks(subTasksForm);

  const response = await UpdateNewSubTaskWithAxios({
    id,
    calculatedTotalTime,
  });
  if (response && typeof response === "object" && "title" in response) {
    console.log(response, "無事タスク更新レスポンスが返されました");
  } else {
    toast.error(response);
  }

  await router.push(`/battletask/${id}?imageurl=${imageurl}`);
};
