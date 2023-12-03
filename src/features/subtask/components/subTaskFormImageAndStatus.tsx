import { VStack, Progress, Image, Text } from "@chakra-ui/react";
import { calculateTotalMinutesOfSubTasks } from "../functions/calculateTotalMinutesOfSubTasks";
import { type subTaskReactHookFormType } from "../types/subTaskReactHookFormType";

type subTaskFormImageAndStatusType = {
  imageUrl: string|undefined;
  subTaskForm: subTaskReactHookFormType;
};

export const SubTaskFormImageAndStatus = ({
  imageUrl,
  subTaskForm,
}: subTaskFormImageAndStatusType) => {
  return (
    <>
      <VStack mt="20%" spacing={12}>
        <Image
          rounded={20}
          boxSize="300px"
          src={imageUrl}
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
          体力：
          <Text as="i" fontSize="4xl" display="inline" pr={2}>
            {calculateTotalMinutesOfSubTasks(subTaskForm)}
          </Text>
          分のタスクです。
        </Text>
      </VStack>
    </>
  );
};
