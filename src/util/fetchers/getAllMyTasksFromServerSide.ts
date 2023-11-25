import { Task } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "~/server/db";

export const getAllMyTasksFromServerSide = async (
  context: GetServerSidePropsContext
) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    console.error("ログインしていません。");
  }
  const userId = token?.sub;
  let tasks: Task[] = [];

  try {
    tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: { id: "desc" },
      include: {
        subTasks: true, 
      },
    });
  } catch (error) {
    console.error("自分のタスク一覧の呼び出しに失敗:", error);
  }

  return tasks
};
