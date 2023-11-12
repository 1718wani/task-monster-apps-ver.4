import type { NextPage } from "next";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Center,
  SimpleGrid,
  VStack,
  FormErrorMessage,
  CardBody,
  Card,
  Text,
  IconButton,
  HStack,
  Divider,
  Image,
  Progress,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { subTaskValidation } from "~/schemas/zodSchema";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

type TaskInput = {
  subtask: string;
  minof: number;
};

type subTaskFormInputs = {
  tasks: TaskInput[];
};

export const Subtask: NextPage = () => {
  const router = useRouter();
  const { id: idQuery, imageurl: imageurlQuery } = router.query;
  const id = Array.isArray(idQuery) ? idQuery[0] : idQuery;
  const imageurl = Array.isArray(imageurlQuery)
    ? imageurlQuery[0]
    : imageurlQuery;
  const defaultTasks = Array(3).fill({ subtask: "", minof: 15 });

  const routerHandler = async (q: string) => {
    await router.push(q);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm<subTaskFormInputs>({
    defaultValues: { tasks: defaultTasks },
    resolver: zodResolver(subTaskValidation),
  });

  const onSubmit = async (data: subTaskFormInputs) => {
    console.log(data, "送信されたデータ");
    for (const task of data.tasks) {
      try {
        const response = await axios.post("http://localhost:3000/api/subtask", {
          taskId: Number(id),
          title: task.subtask,
          isCompleted: false,
          estimatedMinutes: Number(task.minof),
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }

    const calculatedTotalTime = calculateTotalMinof();
    console.log(calculatedTotalTime, "送信時の合計時間はこちらです");

    try {
      const response = await axios.put(
        `http://localhost:3000/api/tasks/${id}`,
        {
          isOnGoing: true, 
          totalMinutes: calculatedTotalTime,
        }
      );
      console.log(response.data, "これがタスク更新時のレスポンスデータ");
    } catch (error) {
      console.error("Error updating totalminutes of task:", error);
    }

    await routerHandler(`/battletask/${id}?imageurl=${imageurl}`);
  };

  const handleInputChange = () => {
    const currentTasks = getValues().tasks;
    currentTasks.push({ subtask: "", minof: 15 });
    setValue("tasks", currentTasks);
  };

  const handleItemDiscard = (index: number) => {
    const currentTasks: TaskInput[] = getValues().tasks;
    currentTasks.splice(index, 1);
    setValue("tasks", currentTasks);
  };

  const isValidMinof = (value: number) => {
    return Number.isInteger(value) && value > 0;
  };

  const calculateTotalMinof = () => {
    return watch("tasks").reduce((sum, task) => {
      if (isValidMinof(task.minof)) {
        return sum + task.minof;
      }

      return sum;
    }, 0);
  };

  console.log("hoge")

  return (
    <SimpleGrid columns={2} spacingY="10px" alignItems={"center"} py="5%">
      <Center>
        <Stack spacing={4} w={"full"} maxW={"xl"} justify="center" ml="50">
          <Heading fontSize={"2xl"}>
            {router.query.title}の体力ゲージを設定する
          </Heading>
          <Text>サブタスクに分解して、工数（分）を入力してください</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            {watch("tasks").map((task, index) => (
              <Flex key={index}>
                <Card rounded="30" mt={5}>
                  <CardBody>
                    <Flex>
                      <FormControl
                        id={`subTask${index}`}
                        isInvalid={
                          errors?.tasks?.[index]?.subtask ??
                          errors?.tasks?.[index]?.minof
                            ? true
                            : false
                        }
                      >
                        <Input
                          id={`subTask${index}Text`}
                          type="text"
                          border="none"
                          {...register(`tasks.${index}.subtask`)}
                          placeholder={`サブタスク${index + 1}`}
                          w={80}
                          fontSize={"sm"}
                        />
                        <FormErrorMessage fontSize="xs">
                          {errors?.tasks?.[index]?.subtask?.message}
                        </FormErrorMessage>
                      </FormControl>
                      <Divider
                        orientation="vertical"
                        borderColor="gray.300"
                        height="40px"
                      />
                      <FormControl
                        id={`manPowerPerSubtask${index}`}
                        isInvalid={errors?.tasks?.[index]?.minof ? true : false}
                      >
                        <Controller
                          name={`tasks.${index}.minof`}
                          control={control}
                          defaultValue={15}
                          render={({ field }) => (
                            <NumberInput
                              id={`minof${index}`}
                              step={5}
                              onChange={(valueString) => {
                                // NumberInputは文字列で値を返すため、整数に変換します。
                                const value = parseInt(valueString, 10);
                                // 新しい値をセットします
                                field.onChange(value);
                              }}
                              value={field.value} // <--- ここで明示的にvalueをセット
                              border={"white"}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          )}
                        />
                        <FormErrorMessage fontSize="xs">
                          {errors?.tasks?.[index]?.minof?.message}
                        </FormErrorMessage>
                      </FormControl>
                      {watch("tasks").length >= 4 && (
                        <IconButton
                          m={2}
                          size={"xs"}
                          isRound={true}
                          variant="solid"
                          aria-label="Delete Task"
                          fontSize="14px"
                          colorScheme="red"
                          onClick={() => handleItemDiscard(index)}
                          icon={<DeleteIcon />}
                        />
                      )}
                    </Flex>
                  </CardBody>
                </Card>
              </Flex>
            ))}

            {watch("tasks").length < 8 && (
              <Card
                h={20}
                mt={5}
                w="2/3"
                backgroundColor="gray.50"
                rounded={30}
              >
                <CardBody>
                  <HStack>
                    <IconButton
                      isRound={true}
                      variant="solid"
                      aria-label="Done"
                      fontSize="20px"
                      icon={<AddIcon />}
                      onClick={handleInputChange}
                    />
                  </HStack>
                </CardBody>
              </Card>
            )}

            <HStack pt={"5%"} spacing={6}>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                loadingText="送信中です"
                isLoading={isSubmitting}
                type="submit"
              >
                戦いを始める
              </Button>
              <Button
                colorScheme={"blue"}
                variant={"outline"}
                onClick={() => router.back()}
              >
                一度戦いをやめる
              </Button>
            </HStack>
          </form>
        </Stack>
      </Center>
      <VStack mt="20%" spacing={12}>
        <Image
          rounded={20}
          boxSize="300px"
          src={imageurl}
          alt="monster"
          shadow={"xl"}
        />
        <Progress
          width={3 / 5}
          colorScheme="teal"
          size="lg"
          isAnimated
          hasStripe
          value={100}
          height="25px"
          shadow="dark-lg"
          rounded="lg"
        />
        <Text fontSize={"lg"} as="b">
          体力：{" "}
          <Text as="i" fontSize="4xl" display="inline" pr={2}>
            {calculateTotalMinof()}
          </Text>
          分のタスクです。
        </Text>
      </VStack>
    </SimpleGrid>
  );
};

export default Subtask;
