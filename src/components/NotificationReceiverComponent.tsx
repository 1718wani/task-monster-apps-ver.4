import { useEffect } from "react";
import Pusher from "pusher-js";
import { ReceiveReactionNotification } from "~/notifications/notifications";
import toast from "react-hot-toast";

type Props = {
  receiverUserId:string
}

type NotificationDataType = {
  senderUserId: string;
  reaction: string; // または具体的なリアクションの型を定義する
};


export const NotificationReceiverComponent = ({ receiverUserId }:Props) => {
  useEffect(() => {
    const channelName = "all-users";
    if (process.env.NEXT_PUBLIC_PUSHER_APP_KEY === undefined || process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER === undefined ){
      toast.error("不明な通信のエラーが発生しました")
      return
    }
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe(channelName);
    channel.bind(`notification-${receiverUserId}`,  (data:NotificationDataType) => {
      ReceiveReactionNotification(data.senderUserId, data.reaction);
    });

    return () => {
      pusher.unsubscribe(channelName);
      pusher.disconnect();
    };
  }, [receiverUserId]);
  return <></>;
};
