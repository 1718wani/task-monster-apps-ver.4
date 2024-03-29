import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/db";
import { z } from "zod";
import { callApiHandleError } from "~/util/api-related/callApiHandleError";
import { generateImage } from "~/util/generate-images/generateAiImage";
import { uploadAlImageBlobToSupabase } from "~/util/generate-images/uploadAIImageBlobToSupabase";
import { getToken } from "next-auth/jwt";
import { limiter } from "~/lib/rateLimiter";

// これはTaskの中の最低限必要なフィールドを取得したもの
const CreateTaskSchema = z.object({
  userId: z.string(),
  title: z.string(),
  detail: z.string().optional(),
  isPublished: z.boolean().optional(),
  imageData: z.string().optional(),
});

interface getTaskQueryParams {
  getIsOngoing?: "true" | undefined;
  getIsPublished?: "true" | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (token) {
    const userId = token.sub;
    const { method } = req;
    const { getIsOngoing, getIsPublished } = req.query as getTaskQueryParams;

    try {
      switch (method) {
        case "GET":
          let whereClause = {};
          if (getIsPublished === "true") {
            whereClause = { ...whereClause, isPublished: true };
          } else if (getIsOngoing === "true") {
            whereClause = {
              ...whereClause,
              userId: { not: userId },
              isOnGoing: true,
            };
          } else {
            res.status(400).json({ error: "Invalid query parameters" });
          }

          const tasks = await prisma.task.findMany({
            where: whereClause,
            orderBy: { id: "desc" },
            include: {
              subTasks: true,
            },
            take: 5,
          });

          res.status(200).json(tasks);

        case "POST":
          const postData = CreateTaskSchema.safeParse(req.body);
          if (!postData.success) {
            res.status(400).json({ error: "Invalid data" });
            return;
          }

          try {
            if (userId !== undefined) {
              await limiter.check(
                30,
                userId,
                `generateTaskImage${token.sub}`,
                1000 * 60 * 60 * 12
              );
            } // 同一アカウントからのタスク作成は10回まで
          } catch (error) {
            res.status(429).json({ error: "タスク作成の上限に達しました" });
            return;
          }

          const imageUrl = await uploadAlImageBlobToSupabase(
            generateImage(),
            "monsters"
          );

          const newTaskData = {
            ...postData.data,
            imageData: imageUrl,
          };

          const newTask = await prisma.task.create({
            data: newTaskData,
          });
          console.log(newTask, "サーバーサイドでCreateされたnewTask");
          res.status(201).json(newTask);

        default:
          res.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      callApiHandleError(error, res);
    }
  } else {
    return res.status(401).json({ error: "Not authenticated" });
  }
}
