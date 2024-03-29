import { type NextApiRequest, type NextApiResponse } from "next";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID ?? "",
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? "",
  secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET ?? "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? "",
});

type NotificationRequestBody = {
  senderUserId: string;
  receiverUserId: string;
  reaction: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { senderUserId, receiverUserId, reaction } =
      req.body as NotificationRequestBody;
    const channelName = "all-users";
    await pusher.trigger(channelName, `notification-${receiverUserId}`, {
      message: "New notification",
      senderUserId: senderUserId,
      receiverUserId: receiverUserId,
      reaction: reaction,
    });
    console.log(receiverUserId, "Notification がこの名前で送信された");
    res.status(200).send("Notification triggered");
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
