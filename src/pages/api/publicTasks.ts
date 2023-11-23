import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = parseInt(req.query.page as string) || 0; // デフォルトは0ページ目
  const limit = parseInt(req.query.limit as string) || 9; // デフォルトは10件

  try {
    const items = await prisma.task.findMany({
      where: { isPublished: true },
      skip: page * limit,
      take: limit,
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "データの取得に失敗しました。" });
  }
}
