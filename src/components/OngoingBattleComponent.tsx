import {
  Avatar,
  Divider,
  HStack,
  Heading,
  Progress,
  Stack,
  Button,
  Tooltip,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Spinner,
  Box,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import type { taskForDisplay } from "~/types/AllTypes";
import { SendReactionNotification } from "~/notifications/notifications";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
import CustomProgressBar from "./ui/ProgressBar/CustomeProgressBar";
import useSWR from "swr";
import { customTruncate } from "~/util/customTruncate";
import { fetcher } from "~/lib/swr-fetcher";

const urlWithUserId = (userId: string | undefined) => {
  return `http://localhost:3000/api/task?getIsOngoing=true`;
};

export const OngoingBattleComponents = () => {
  const { data: session } = useSession();
  const userId = session?.user.userId;

  const {
    data: tasks = [],
    error,
    isLoading,
    
  } = useSWR<taskForDisplay[], Error>(() => urlWithUserId(userId), fetcher, {
    refreshInterval: 10000,
  });
  console.log(tasks, "サイドバーのTasks");

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;
    if (!key || !cluster) {
      console.log("key or cluster is not defined");
      return;
    }
    // Pusherのセットアップ
    const pusher = new Pusher(key, {
      cluster: cluster,
    });

    return () => {
      // コンポーネントのアンマウント時にPusher接続をクローズ
      pusher.disconnect();
    };
  }, []);

  const sendComment = async (receiverUserId: string, reaction: string) => {
    try {
      const response = await axios.post("/api/trigger-notification", {
        senderUserId: userId,
        receiverUserId: receiverUserId,
        reaction: reaction,
      });
      console.log(response.data); // "Notification triggered"と表示されるはず
    } catch (error) {
      console.error(error);
    }

    SendReactionNotification(receiverUserId, reaction);
  };

  return (
    <>
      <Heading size="md" px={4} pt={2} pb={1}>
        Ongoing Battle
      </Heading>
      <Divider pt={2} />

      {isLoading && <Spinner />}
      {error && <Box>APIからデータの取得に失敗しました: {error?.message}</Box>}

      {tasks.length > 0 &&
        tasks.map((task) => (
          <>
            <Menu placement="right">
              <Tooltip label="コメントを送る" aria-label="A tooltip">
                <MenuButton
                  as={Button}
                  w={"full"}
                  h={"full"}
                  background={"white"}
                >
                  <HStack pt={2} pb={1} px={4} cursor="pointer">
                    <Avatar size={"md"} src={task.imageData ?? undefined} />

                    <Stack width={"full"}>
                      <Heading  size="xs">{ customTruncate (task.title,9)}</Heading>

                      <CustomProgressBar
                        w={"full"}
                        size="sm"
                        value={
                          task.subTasks.filter((subTask) => subTask.isCompleted)
                            .length / task.subTasks.length
                        }
                      />
                    </Stack>
                  </HStack>
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem
                  onClick={async () => await sendComment(task.userId, "👏")}
                >
                  ナイスファイト！👏
                </MenuItem>
                <MenuItem
                  onClick={async () => await sendComment(task.userId, "💪")}
                >
                  わたしも頑張ります！💪
                </MenuItem>
                <MenuItem
                  onClick={async () => await sendComment(task.userId, "🤝")}
                >
                  一緒にがんばりましょう🤝
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ))}
    </>
  );
};
