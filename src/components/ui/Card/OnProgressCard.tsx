import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Progress,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { EditableComponentProps } from "./EditableCard";
import { subTaskForDisplay } from "~/types/AllTypes";
import { useRouter } from "next/router";
import { customTruncate } from "~/util/customTruncate";

interface onProgressComponentProps extends EditableComponentProps {
  totalMinutes: number;
  remainingMinutes: number;
  subTasks: subTaskForDisplay[];
}

export const OnProgressCard = ({
  id,
  enterEditMode,
  imageData,
  title,
  detail,
  totalMinutes,
  remainingMinutes,
  subTasks,
}: onProgressComponentProps) => {
  const router = useRouter();

  const completedSubTasks = subTasks
    ? subTasks.filter((subTask) => subTask.isCompleted).length
    : 0;

  const totalSubTasks = subTasks ? subTasks.length : 0;
  return (
    <Center py={6}>
      <motion.div
        initial={{ x: 0, y: 0 }}
        whileHover={{ x: -3, y: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
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
            <Heading fontSize={"xl"} fontFamily={"body"}>
              {customTruncate(title, 10)}
            </Heading>
            <Text
              textAlign={"center"}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
              fontSize={"xs"}
            >
              {customTruncate(detail,25)}
            </Text>

            <Badge colorScheme="yellow" fontSize="0.8em">
              on Progress
            </Badge>

            <Text fontSize="xs">
              残りタスク {totalSubTasks - completedSubTasks} / {totalSubTasks}
            </Text>
            <Progress
              isAnimated
              hasStripe
              rounded="lg"
              width={"full"}
              h={"2"}
              value={
                ((totalSubTasks - completedSubTasks) / totalSubTasks) * 100
              }
            />
            <Text fontSize="xs">
              残り時間 {remainingMinutes}分 / {totalMinutes} 分
            </Text>
            <Progress
              isAnimated
              hasStripe
              rounded="lg"
              width={"full"}
              h={"2"}
              value={(remainingMinutes / totalMinutes) * 100}
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
                onClick={() => enterEditMode(id)}
              >
                編集する
              </Button>

              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"red.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "red.500",
                }}
                _focus={{
                  bg: "red.500",
                }}
                onClick={async () => {
                  await router.push(
                    `/battletask/${id}?imageurl=${imageData}`
                  );
                }}
              >
                討伐再開
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </motion.div>
    </Center>
  );
};

export default OnProgressCard;
