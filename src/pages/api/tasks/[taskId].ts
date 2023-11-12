import { NextApiRequest, NextApiResponse } from "next";
import {
  ContentUpdateSchema,
  PublishUpdateSchema,
  RemainingTimeUpdateSchema,
  TotalTimeUpdateSchema,
} from "~/schemas/zodSchema";
import { prisma } from "~/server/db";
import { callApiHandleError } from "~/util/callApiHandleError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // URLパラメータからtaskIdを取り出してInt型にして検索に使えるようにする
  const taskId = parseInt(req.query.taskId as string, 10);

  // taskIdが見つからなかった場合taskIdが無効ということになる
  if (isNaN(taskId)) {
    res.status(400).json({ error: "Invalid task ID" });
    return;
  }

  // 先に現在のタスクを取得する
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  console.log(task, "taskIdを指定してAPI Routesで呼び出したTask");
  console.log("Received method:", req.method);

  try {
    switch (req.method) {
      case "GET":
        res.status(200).json(task);
        break;

      case "PUT":
        await handlePutRequest(req, res, taskId);
        break;

      case "DELETE":
        await prisma.task.delete({ where: { id: taskId } });
        res.status(200).json({
          message: `Task id:${task.id} title:${task.title} deleted successfully`,
        });
        break;

      default:
        res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    callApiHandleError(error, res);
  }
}

async function handlePutRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  taskId: number
) {
  console.log("handlePutRequestがサーバーにて呼び出されました");
  let schema;
  if ("publishedTitle" in req.body && "publishedStrategy" in req.body) {
    schema = PublishUpdateSchema;
    console.log("publishedTitleとpublishedStrategyが含まれていました");
  } else if ("title" in req.body) {
    schema = ContentUpdateSchema;
    console.log("titleが含まれていました");
  } else if ("totalMinutes" in req.body && "isOnGoing" in req.body) {
    schema = TotalTimeUpdateSchema;
    console.log("totalTimeとisOnGoingが含まれていました");
  } else if ("remainingMinutes" in req.body && "isOnGoing" in req.body ) {
    schema = RemainingTimeUpdateSchema;
    console.log("remainingMinutesが含まれていました");
  } else {
    console.log("何も含まれていませんでした");
    res.status(400).json({ error: "Invalid Post" });
    return;
  }

  const postData = schema.safeParse(req.body);
  if (!postData.success) {
    res.status(400).json({ error: "Invalid data" });
    return;
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: postData.data,
  });
  console.log(updatedTask, "成功しました");
  res.status(200).json(updatedTask);
}
