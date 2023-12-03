import { type SubTask, type Task } from "@prisma/client";

type TaskWithTotalMinutes = Omit<Task, 'totalMinutes'> & {
  totalMinutes: NonNullable<Task['totalMinutes']>;
};

export type TaskIncludingSubTasksWithTotalMinutes = TaskWithTotalMinutes & {
  subTasks: SubTask[];
};