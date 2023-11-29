import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SlideFade,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import router from "next/router";
import { type createTaskFormProps } from "../types/createTaskFormProps";
import { type taskCreateFormInput } from "../types/taskCreateFormInput";

type onSubmitProps = {
  onSubmit: (data: taskCreateFormInput) => Promise<void>;
};

type ExtendedCreateTaskFormProps = createTaskFormProps & onSubmitProps;

export const TaskCreateFormComponent = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  isSubmitSuccessful,
  onSubmit,
}: ExtendedCreateTaskFormProps) => {
  console.log(isSubmitSuccessful, "未利用エラー防止");
  return (
    <>
      <SlideFade in={true} offsetY="50%">
        <Flex minH={"100vh"} pt="16%" align={"flex-start"} justify={"center"}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="tasktitle">タスクのタイトル</FormLabel>
                <Input
                  id="tasktitle"
                  placeholder="タスクのタイトル"
                  {...register("title")}
                />
                {errors.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
                <FormLabel pt={2} htmlFor="taskdetail">
                  タスクの詳細
                </FormLabel>
                <Input
                  id="taskdetail"
                  placeholder="タスクの詳細"
                  {...register("detail")}
                />
              </FormControl>

              <Stack spacing={3} direction={["column", "row"]}>
                <Button
                  mt={4}
                  colorScheme="teal"
                  loadingText="送信中です"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  生成する
                </Button>
                <Button
                  mt={4}
                  colorScheme="gray"
                  onClick={async () => await router.push("/")}
                  disabled={isSubmitting}
                >
                  もどる
                </Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </SlideFade>
    </>
  );
};
