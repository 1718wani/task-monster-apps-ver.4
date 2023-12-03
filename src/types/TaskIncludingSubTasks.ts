import { type SubTask, type Task } from "@prisma/client";

export type TaskIncludingSubTasks = Task & {
  subTasks: SubTask[];
};
