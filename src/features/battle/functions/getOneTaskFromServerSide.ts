import { prisma } from "~/lib/db";
import { type TaskIncludingSubTasks } from "~/types/TaskIncludingSubTasks";

type Props = {
  id: string;
};

export const getOneTaskFromServerSide = async ({ id }: Props) => {
  let tasks: TaskIncludingSubTasks | null = null;
  try {
    tasks = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        subTasks: true,
      },
    });
  } catch (error) {
    console.error("prisma.task.finduniqueの呼び出しに失敗:", error);
  }
  return tasks;
};
