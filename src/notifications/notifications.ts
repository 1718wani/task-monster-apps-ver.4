import { toast } from "react-hot-toast";



export const RegisterationSuccessNotification = () => toast("新しくモンスターを生成しました", { icon: "👏" });
export const RegisterationFailureNotification = () => toast("タスクの作成に失敗しました");
export const SendReactionNotification = (receiverUserId:string,reaction:string) => toast(`${receiverUserId}に${reaction}を送信しました！`, );
export const CompleteBattleSuccess = () => toast("タスク討伐完了！", { icon: "🎉" });
export const ReceiveReactionNotification = (senderUserId:string,reaction:string) => toast(`${senderUserId}から${reaction}を受信しました！`, );