import { atom } from "jotai";
import { type TaskIncludingSubTasks } from "~/types/TaskIncludingSubTasks";

export const HomeTasksAtom = atom<TaskIncludingSubTasks[]>([]);
