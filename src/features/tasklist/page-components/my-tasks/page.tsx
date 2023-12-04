import {
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  Center,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Text,
} from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { NotificationReceiverComponent } from "~/components/NotificationReceiverComponent";
import TodoCardComponent from "~/components/TodoCardComponent";
import CreateNewMonsterButtonComponent from "~/components/ui/Button/Button";
import { pagesPath } from "~/lib/$path";
import { type HomeProps } from "~/types/HomeProps";

import { type TaskIncludingSubTasks } from "~/types/TaskIncludingSubTasks";

export const HomeList = ({ tasks }: HomeProps) => {
  const originalDisplayedTasks = tasks;
  const [activeTab, setActiveTab] = useState<string | undefined>("すべて");
  const handleTabsChange = (index: number) => {
    const tabMap = ["すべて", "未開始", "進行中"];
    setActiveTab(tabMap[index]);
  };

  const filterTasks = (
    tasks: TaskIncludingSubTasks[],
    tab: string | undefined
  ) => {
    switch (tab) {
      case "未開始":
        return tasks.filter(
          (task) => !task.isCompleted && task.totalMinutes === null
        );
      case "進行中":
        return tasks.filter(
          (task) => !task.isCompleted && task.totalMinutes !== null
        );
      case "すべて":
      default:
        return tasks;
    }
  };
  const displayedTasks = filterTasks(originalDisplayedTasks, activeTab);

  const router = useRouter();
  const { data: session, status } = useSession();
  const [editableTaskId, setEditableTaskId] = useState<number | null>(null); // 編集可能なタスクのIDを保持する state を追加

  const { isOpen, onOpen, onClose } = useDisclosure();
  const clickHandler = async () => {
    await router.push(pagesPath.createtask.$url().pathname);
  };
  const enterEditMode = (taskId: number | null) => {
    setEditableTaskId(taskId);
  };
  console.log(session, "session in HomeList");

  return (
    <>
      <Tabs
        variant="soft-rounded"
        colorScheme="teal"
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>すべて</Tab>
          <Tab>未開始</Tab>
          <Tab>進行中</Tab>
        </TabList>
      </Tabs>
      <NotificationReceiverComponent
        receiverUserId={session?.user.userId ?? ""}
      />
      {displayedTasks.length === 0 && (
        <>
          <Center>まずタスクを作成しましょう</Center>
        </>
      )}
      {displayedTasks.length !== 0 && (
        <>
          <Grid templateColumns={["1fr", null, "1fr 1fr"]} gap={1}>
            {displayedTasks.map((task) => (
              <TodoCardComponent
                key={task.id}
                id={task.id}
                isEditable={task.id === editableTaskId}
                title={task.title}
                detail={task.detail}
                isCompleted={task.isCompleted}
                imageData={
                  task.imageData ??
                  "https://images.unsplash.com/photo-1682685797365-41f45b562c0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"
                } // 画像データがnullの場合、デフォルトのURLを使用
                totalMinutes={task.totalMinutes}
                remainingMinutes={task.remainingMinutes}
                enterEditMode={enterEditMode}
                subTasks={task.subTasks}
              />
            ))}
          </Grid>
        </>
      )}

      <CreateNewMonsterButtonComponent onClick={clickHandler} />
      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay
          bg="blackAlpha.400"
          backdropFilter="blur(3px)"
          backdropInvert="40%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>ようこそ！</ModalHeader>
          <ModalBody>
            <Text>
              ログインボタンよりGoogleアカウント、もしくはメールアドレスでログイン・サインアップしてください。
            </Text>
            <Center p={5}>
              <Button
                onClick={() =>
                  signIn(undefined, { callbackUrl: `${baseUrl}` })
                }
                colorScheme="teal"
              >
                ログイン
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
