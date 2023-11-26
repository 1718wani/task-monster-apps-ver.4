import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "~/server/db";
import { rateLimit } from "~/util/api-related/rate-limit";

const limiter = rateLimit();

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
    res.status(500).json({ error: "内部サーバーエラーが発生しました。" });
  }
}
