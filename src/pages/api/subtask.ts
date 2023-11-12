import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

interface ExtendedNextApiRequestAtSubtask extends NextApiRequest {
  body: {
    taskId: number;
    title: string;
    isCompleted: boolean;
    estimatedMinutes: number;
  };
}

export default async function handler(
  req: ExtendedNextApiRequestAtSubtask,
  res: NextApiResponse
) {
  const { taskId, title, isCompleted, estimatedMinutes } = req.body;
  const { forGetTaskId, subTaskId } = req.query;

  const { method } = req;
  switch (method) {
    case "GET":
      if (forGetTaskId) {
        const subTasks = await prisma.subTask.findMany({
          where: {
            taskId: Number(forGetTaskId), // taskIdを使って関連するサブタスクを検索します
          },
          orderBy: {
            id: "asc",
          },
        });
        res.status(200).json(subTasks);
      } else {
        res.status(400).json({ error: "Task ID is required" }); // taskIdが不足している場合のエラーハンドリング
      }
      break;

    case "POST":
      const subtask = await prisma.subTask.create({
        data: {
          taskId: taskId,
          title: title,
          isCompleted: isCompleted,
          estimatedMinutes: estimatedMinutes,
        },
      });
      res.status(200).json(subtask);
      break;
    case "PUT":
      if (subTaskId) {
        console.log(subTaskId, "subTaskIdの値")
        const updatedSubTask = await prisma.subTask.update({
          where: { id: Number(subTaskId) },
          data: { isCompleted: isCompleted },
        });
        res.status(200).json(updatedSubTask);
      } else {
        res.status(400).json({ error: "SubTask ID is required for updating." });
      }
      break;
    default:
      break;
  }
}
