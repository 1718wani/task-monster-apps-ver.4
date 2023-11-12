import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { HomeTasksAtom } from "~/atoms/atom";
import { formInputs } from "~/pages/createtodo";
import type { responseDisplay, taskForDisplay } from "~/types/AllTypes";

export interface EditableComponentProps {
  id: number;
  imageData: string;
  enterEditMode: (id: number | null) => void;
  title: string;
  detail: string | null;
}

export const EditableCard = ({
  id,
  enterEditMode,
  imageData,
  title,
  detail,
}: EditableComponentProps) => {
  const [tasksState, setTasksState] = useAtom(HomeTasksAtom);
  // const [updatedTask, setUpdatedTask] = useState<taskForDisplay>();

  const convertToTaskForDisplay = (data: responseDisplay): taskForDisplay => {
    return {
      userId: data.userId,
      id: data.id,
      title: data.title,
      detail: data.detail,
      isCompleted: data.isCompleted,
      imageData: data.imageData,
      totalMinutes: data.totalMinutes,
      remainingMinutes: data.remainingMinutes,
      subTasks: data.subTasks,
      // 他にもtaskForDisplay型に必要なフィールドがあればここに追加します
    };
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      taskTitle: title,
      taskDetail: detail ?? "",
    },
  });
  const onSubmit = async (data: formInputs) => {
    console.log(data, "編集コンポーネントにおける送信データ");
    try {
      const response = await axios.put(
        `http://localhost:3000/api/tasks/${id}`,
        {
          title: data.taskTitle,
          detail: data.taskDetail,
        }
      );
      const updatedTask: taskForDisplay = convertToTaskForDisplay(
        response.data as responseDisplay
      );
      setTasksState((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      console.log(updatedTask, "UpdateTask");
      console.log(response.data, "これがタスク更新時のレスポンスデータ");
    } catch (error) {
      console.error("Error updating task:", error);
    }
    enterEditMode(null);
  };

  const deleteTask = async (taskId: number) => {
    // APIを呼び出してデータベースからタスクを削除
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      console.log(`Task with id ${taskId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskDiscard = async (taskId:number) => {
    // ローカルステートからタスクを削除
    setTasksState((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast(
      (t) => (
        <Box>
          <span>削除しました</span>
          <Button  textColor={"GrayText"} fontSize={"sm"} fontWeight={2} pl={2} variant={"unstyled"} onClick={() => {
            toast.dismiss(t.id);
            setTasksState(tasksState); // 元に戻す
          }}>
            取り消す
          </Button>
          </Box>
      ),
      {
        duration: 4500, // 4.5秒後に消える
        onClose: () => deleteTask(taskId), // トーストが消えたら削除処理
      }
    );

    // APIを呼び出してデータベースからもタスクを削除
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      console.log(`Task with id ${taskId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  console.log(tasksState, "これがタスク更新時のステート");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       <Toaster />
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image objectFit="cover" boxSize="100%" src={imageData} alt="#" />
          </Flex>

          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Controller
              name="taskTitle"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="lg"
                  fontWeight="bold"
                  variant="unstyled"
                  fontFamily={"body"}
                  fontSize={"2xl"}
                  bg={"gray.50"}
                  autoFocus // これを追加
                />
              )}
            />
            <Controller
              name="taskDetail"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  size="md"
                  variant="unstyled"
                  textAlign={"center"}
                  bg={"gray.50"}
                  px={3}
                />
              )}
            />

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                _focus={{
                  bg: "gray.200",
                }}
                onClick={() => enterEditMode(null)}
              >
                キャンセル
              </Button>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                colorScheme="teal"
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                isLoading={isSubmitting}
                type="submit"
              >
                保存する
              </Button>
              <IconButton
                m={1}
                size={"xs"}
                isRound={true}
                variant="solid"
                aria-label="Delete Task"
                fontSize="14px"
                colorScheme="red"
                onClick={() => handleTaskDiscard(id)}
                icon={<DeleteIcon />}
              />
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </form>
    
  );
};

export default EditableCard;
