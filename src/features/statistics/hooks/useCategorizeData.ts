import type { Task } from "@prisma/client";
import { categorizeTasks } from "~/util/reducers/categorizeTasks";



export const useCategorizedData = (data: Task[]) => {
  const categorizedData = [
    {
      name: "未開始",
      value: categorizeTasks(data).isBeforeStartTasks.length,
    },
    {
      name: "討伐中",
      value: categorizeTasks(data).isOnProgressTasks.length,
    },
    {
      name: "討伐完了",
      value: categorizeTasks(data).isCompletedTasks.length,
    },
  ];

  return categorizedData;
};
