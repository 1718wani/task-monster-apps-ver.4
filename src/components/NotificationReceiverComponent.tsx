import { useEffect } from "react";
import Pusher from "pusher-js";
import { env } from "process";
import { ReceiveReactionNotification } from "~/notifications/notifications";

export const NotificationReceiverComponent = ({ receiverUserId }) => {

  useEffect(() => {
      const channelName = "all-users";
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      });

      const channel = pusher.subscribe(channelName);
      console.log(channel, "これがchannel");
      console.log(receiverUserId, "これがreceiverUserId");
      channel.bind(`notification-${receiverUserId}`, async (data) => {
        // 通知を受信通信を受信したら、通知を表示する

        console.log(data, "これがdataが受信された証拠")
         ReceiveReactionNotification(data.senderUserId, data.reaction);
      });

      return () => {
        pusher.unsubscribe(channelName);
        pusher.disconnect();
      };
    }, [receiverUserId]);
  return <></>;
};
