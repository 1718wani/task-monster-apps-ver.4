import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "~/lib/db";
import { callApiHandleError } from "~/util/api-related/callApiHandleError";
import { generateCustomUserImage } from "~/util/generate-images/generateCustomUserImage";
import { uploadAlImageBlobToSupabase } from "~/util/generate-images/uploadAIImageBlobToSupabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (token) {
    const { customName, sex } = req.body;
    const { userId } = req.query;
    const { method } = req;
    try {
      switch (method) {
        case "GET":
          const user = await prisma.user.findUnique({
            where: { id: userId as string },
          });
          if (!user) {
            res.status(404).json({ error: "User not found" });
          }
          res.status(200).json(user);
        case "PUT":
          if (userId) {
            const imageUrl = await uploadAlImageBlobToSupabase(
              generateCustomUserImage(sex),
              "customUserImages"
            );
            const updatedUser = await prisma.user.update({
              where: { id: userId.toString() },
              data: {
                customName: customName,
                customImage: imageUrl,
              },
            });
            res.status(200).json(updatedUser);
          } else {
            res
              .status(400)
              .json({ error: "SubTask ID is required for updating." });
          }

        default:
          break;
      }
    } catch (error) {
      callApiHandleError(error, res);
    }
  } else {
    return res.status(401).json({ error: "Not authenticated" });
  }
}
