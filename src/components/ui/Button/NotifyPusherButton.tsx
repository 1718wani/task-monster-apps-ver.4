import { useEffect } from "react";
import Pusher from 'pusher-js';
import { env } from "process";

export const NotifyPusherComponent = () => {
    useEffect(() => {
        // Pusherのセットアップ
        const pusher = new Pusher(env.PUSHER_APP_KEY, {
          cluster: env.PUSHER_APP_CLUSTER,
        });
    
        return () => {
          // コンポーネントのアンマウント時にPusher接続をクローズ
          pusher.disconnect();
        };
      }, []);


    return (
        <>
        
        </> 
        )

}

export default NotifyPusherComponent;