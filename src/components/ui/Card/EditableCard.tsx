import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useAtom } from "jotai";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { HomeTasksAtom } from "~/atoms/atom";
import { baseUrl } from "~/consts/url-paths";
import { type taskUpdateFormInput } from "~/features/task/types/taskUpdateFormInput";
import type {} from "~/pages/createtask";
import { type TaskIncludingSubTasks } from "~/types/TaskIncludingSubTasks";

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

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: title,
      detail: detail ?? "",
    },
  });
  const onSubmit = async (data: taskUpdateFormInput) => {
    console.log(data, "編集コンポーネントにおける送信データ");
    try {
      const response = await axios.put<TaskIncludingSubTasks>(
        `${baseUrl}/api/tasks/${id}`,
        {
          title: data.title,
          detail: data.detail,
        }
      );
      const updatedTask = response.data;
      setTasksState((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error(error, "このエラーが原因です。");
    }
    enterEditMode(null);
  };

  const deleteTask = async (taskId: number) => {
    // APIを呼び出してデータベースからタスクを削除
    try {
      await axios.delete(`${baseUrl}/api/tasks/${taskId}`);
      console.log(`Task with id ${taskId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskDiscard = (taskId: number) => {
    // ローカルステートからタスクを削除
    setTasksState((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
    const toastId = toast(
      (t) => (
        <Box>
          <span>削除しました</span>
          <Button
            textColor={"GrayText"}
            fontSize={"sm"}
            fontWeight={2}
            pl={2}
            variant={"unstyled"}
            onClick={() => {
              toast.dismiss(t.id);
              setTasksState(tasksState); // 元に戻す
              clearTimeout(timerId); // タイマーをクリア
            }}
          >
            削除取り消し
          </Button>
        </Box>
      ),
      {
        duration: 4500, // 4.5秒後に消える
      }
    );

    // トーストが閉じたときに削除処理を実行する
    const timerId = setTimeout(() => {
      deleteTask(taskId)
        .then(() => {
          toast.dismiss(toastId); // トーストを閉じる
        })
        .catch((error) => {
          // エラーハンドリングをここに追加
          console.error("Task deletion failed:", error);
        });
    }, 4500);
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
              name="title"
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
              name="detail"
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
