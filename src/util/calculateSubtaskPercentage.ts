import type { subTaskForDisplay } from "~/types/AllTypes";

export const calculateSubtaskPercentage = (
  subtasks: subTaskForDisplay[]
): number => {
  // フィルタリングと集計
  const completedMinutes = subtasks
    .filter((task) => task.isCompleted)
    .reduce((acc, curr) => acc + curr.estimatedMinutes, 0);

  const totalMinutes = subtasks.reduce(
    (acc, curr) => acc + curr.estimatedMinutes,
    0
  );

  // ゼロ除算を防ぐ
  if (totalMinutes === 0) {
    return 0;
  }
  const result = (1 - completedMinutes / totalMinutes) * 100;

  return Math.ceil(result);
};
