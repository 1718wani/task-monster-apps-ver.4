import { prisma } from "~/lib/db";

export const createTask = async (
  userId: string,
  title: string,
  detail: string | null,
  imageData: string
) => {
  return await prisma.task.create({
    data: {
      userId,
      title,
      detail,
      imageData,
      isCompleted: false,
      isOnGoing: false,
      isPublished: false,
    },
  });
};
