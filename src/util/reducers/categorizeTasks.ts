import type { Task } from "@prisma/client";

export const categorizeTasks = (tasks: Task[]) => {
  const categorizedTasks = tasks.reduce<{
    isBeforeStartTasks: Task[];
    isOnProgressTasks: Task[];
    isCompletedTasks: Task[];
  }>(
    (acc, task) => {
      if (!task.isCompleted) {
        if (task.totalMinutes === null) {
          acc.isBeforeStartTasks.push(task);
        } else {
          acc.isOnProgressTasks.push(task);
        }
      } else {
        acc.isCompletedTasks.push(task);
      }
      return acc;
    },
    {
      isBeforeStartTasks: [],
      isOnProgressTasks: [],
      isCompletedTasks: [],
    }
  );

  return categorizedTasks;
};
