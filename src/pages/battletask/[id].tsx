import type { GetServerSidePropsContext, NextPage } from "next";
import {
  Box,
  Button,
  Image,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useDisclosure,
  Card,
  CardBody,
  Flex,
  SlideFade,
  Heading,
} from "@chakra-ui/react";
import { BsCapsule } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { TimerOfTaskComponent } from "~/components/TimerOfTaskComponent";
import axios from "axios";
import { EndOfBattleModal } from "~/components/EndOfBattleModal";
import type {
  ProgressStatus,
  subTaskForDisplay,
  taskForDisplay,
} from "~/types/AllTypes";
import { useRouter } from "next/router";
import { TimeUpModal } from "~/components/TimeUpModal";
import CustomProgressBar from "~/components/ui/ProgressBar/CustomeProgressBar";
import { useInterval } from "usehooks-ts";
import { prisma } from "~/lib/db";
import { Prisma } from "@prisma/client";
import { useTimer } from "react-timer-hook";
import { UseProgressManager } from "~/hooks/useProgressManager";
import { calculateSubtaskPercentage } from "~/util/calculateSubtaskPercentage";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { usePageLeaveSaveRemainingMinutes } from "~/hooks/usePageLeaveSaveRemainingMinutes";

type forBattleProps = {
  initialTask: taskForDisplay;
  imageurl: string | undefined;
};

export const addTimeOptions = [
  { value: 1 },
  { value: 5 },
  { value: 10 },
  { value: 30 },
];

type BattleMenuStatus = "BaseMenu" | "AddMinutesMenu" | "SubtaskMenu";

export const BattleTask: NextPage<forBattleProps> = ({
  initialTask,
  imageurl,
}) => {
  const [subtasks, setSubtasks] = useState<subTaskForDisplay[]>(
    initialTask.subTasks
  );
  const [minutesToAdd, setMinutesToAdd] = useState<number>(0);
  const [menuStatus, setMenuStatus] = useState<BattleMenuStatus>("BaseMenu");
  const { setProgrammaticNavigation } = usePageLeaveSaveRemainingMinutes();

  // remainingMinutesが定義されたらそちらを採用、そうでなければ減った時間のそちらを採用
  const [remainingTotalSeconds, setRemainingTotalSeconds] = useState(
    initialTask.remainingMinutes
      ? initialTask.remainingMinutes * 60
      : initialTask.totalMinutes * 60
  );

  // useTimerを初期化
  const { totalSeconds, seconds, minutes, hours, pause, restart } = useTimer({
    expiryTimestamp: new Date(
      new Date().getTime() + remainingTotalSeconds * 1000
    ),
    onExpire: () => onTimeUpOpen(),
  });

  const { progressValue, setProgressStatus } = UseProgressManager({
    initialProgressValue: calculateSubtaskPercentage(subtasks),
    targetProgressValue: calculateSubtaskPercentage(subtasks),
    duration: 30,
    onReachZero: () => {
      pause();
      onOpen();
    },
  });

  const {
    progressValue: progressValueOfTimer,
    setProgressStatus: setProgressStatusOfTimer,
    progressStatus: progressStatusOfTimer,
  } = UseProgressManager({
    initialProgressValue: totalSeconds,
    targetProgressValue: totalSeconds + minutesToAdd * 60,
    duration: 100,
    onReachCountingUpTarget: () => {
      const _newRemainingTotalSeconds = totalSeconds + minutesToAdd * 60;
      console.log(_newRemainingTotalSeconds, "newRemainingTotalminutes");
      restart(
        new Date(new Date().getTime() + _newRemainingTotalSeconds * 1000)
      );
      setMinutesToAdd(0);
      toast("回復しました！", {
        icon: "💊",
      });
    },
  });

  const notify = () => toast("サブタスク完了によるこうげき", { icon: "👏" });
  // タスクを全部コンプリートした時のモーダル開閉の状態管理
  const { isOpen, onOpen, onClose } = useDisclosure();

  // タイマー終了時のモーダル開閉の状態管理
  const {
    isOpen: isTimeUpOpen,
    onOpen: onTimeUpOpen,
    onClose: onTimeUpClose,
  } = useDisclosure();

  const {
    isOpen: popoverIsOpen,
    onOpen: openPopover,
    onClose: closePopover,
  } = useDisclosure();

  const router = useRouter();

  // サブタスクの完了状態を変更する関数
  const toggleItemDone = async (id: number | string) => {
    try {
      // ここでAPIを呼び出します。例えば、PUTメソッドを使ってあるidのサブタスクの状態を更新する。
      const response = await axios.put(
        `http://localhost:3000/api/subtask/?subTaskId=${id}`,
        {
          // isCompletedのBoolean値が変更されます。
          isCompleted: !subtasks.find((subtask) => subtask.id === id)
            ?.isCompleted,
        }
      );

      // レスポンスから更新されたサブタスクのデータを取得
      const updatedSubtask = response.data;

      // 完了ボタンを押したsubtaskの値だけ、塗り替えてsubtasksを更新する
      setSubtasks((prevSubtasks) =>
        prevSubtasks.map((subtask) =>
          subtask.id === id ? updatedSubtask : subtask
        )
      );

      // Counting Downを開始する。
      setProgressStatus("isCountingDown");
    } catch (error) {
      console.error("APIの呼び出しに失敗:", error);
    }
  };

  const backToHome = async (optionMinutes: number | null) => {
    setProgrammaticNavigation(true);
    const id = router.query.id;
    let remainingMinutes = Math.ceil(totalSeconds / 60);
    // optionMinutesが元々の最大分数より小さい場合
    if (
      optionMinutes &&
      initialTask.totalMinutes &&
      optionMinutes < initialTask.totalMinutes
    ) {
      remainingMinutes = optionMinutes;
    }
    // optionMinutesが元々の最大風数より大きい場合
    if (
      optionMinutes &&
      initialTask.totalMinutes &&
      optionMinutes > initialTask.totalMinutes
    ) {
      remainingMinutes = Math.ceil(initialTask.totalMinutes / 2);
    }

    try {
      await axios.put(`http://localhost:3000/api/tasks/${id}`, {
        isOnGoing: false,
        remainingMinutes: remainingMinutes,
      });

      await router.push("/");
    } catch (error) {
      console.error("Error updating totalminutes of task:", error);
    }
  };

  // 現在のタイムスタンプを表示するcurretnTimeStampを作成
  const currentTimeStamp = new Date();
  currentTimeStamp.setSeconds(
    currentTimeStamp.getSeconds() + remainingTotalSeconds
  );

  const handleToAddMinutesChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setMinutesToAdd(parseInt(value, 10));
  };

  const handleToAddMinutesFromMenu = (e: number): void => {
    pause();
    const newRemainingSeconds = totalSeconds + e * 60;

    setMinutesToAdd(e);

    setRemainingTotalSeconds(newRemainingSeconds);
    setProgressStatusOfTimer("isCountingUp");
  };

  const handleToAddMinutesSubmit = () => {
    closePopover();
    onTimeUpClose();
    pause();
    const newRemainingTotalSeconds = totalSeconds + minutesToAdd * 60;
    setRemainingTotalSeconds(newRemainingTotalSeconds);
    setProgressStatusOfTimer("isCountingUp");
  };

  const variants = {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  };

  return (
    <SimpleGrid columns={2} spacingY="10px" py={20}>
      <Toaster />
      <Stack pt={"5%"} spacing={6} w={"full"} maxW={"xl"} ml="10%">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={variants.animate}
          transition={variants.transition}
        >
          <TimerOfTaskComponent
            initialAmountSeconds={60 * initialTask.totalMinutes}
            totalSeconds={totalSeconds}
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            progressValueOfTimer={progressValueOfTimer}
            progressStatusOfTimer={progressStatusOfTimer}
          />
        </motion.div>

        {menuStatus === "SubtaskMenu" ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={variants.animate}
              transition={variants.transition}
            >
              <Stack pt={"10%"} spacing={"5"} align={"center"}>
                {subtasks.map((subtask) => (
                  <Card
                    onClick={async () => {
                      await toggleItemDone(subtask.id); // async/awaitを使っています
                      notify();
                    }}
                    bg={subtask.isCompleted ? "gray.600" : "white"}
                    w={"70%"}
                    pl={"5%"}
                    rounded={"3xl"}
                    key={subtask.id}
                    size={"sm"}
                    _hover={
                      subtask.isCompleted
                        ? {}
                        : {
                            bg: "gray.700",
                            textColor: "white",
                            borderWidth: "1px",
                            borderColor: "white",
                          }
                    }
                  >
                    <CardBody>
                      <Flex align="center" justifyContent={"space-between"}>
                        <Text fontSize={"md"}>{subtask.title}</Text>
                        <CheckCircleIcon
                          boxSize={"8%"}
                          color={"teal.50"}
                          mr={"10%"}
                        />
                      </Flex>
                    </CardBody>
                  </Card>
                ))}

                <Card
                  onClick={() => setMenuStatus("BaseMenu")}
                  w={"70%"}
                  rounded={"3xl"}
                  _hover={{
                    bg: "gray.700",
                    textColor: "white",
                    borderWidth: "1px",
                    borderColor: "white",
                  }}
                >
                  <CardBody>
                    <Text as={"b"}>戻る</Text>
                  </CardBody>
                </Card>
              </Stack>
            </motion.div>
          </>
        ) : (
          <></>
        )}

        {menuStatus === "BaseMenu" ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={variants.animate}
              transition={variants.transition}
            >
              <Stack pt={"10%"} spacing={"5"} align={"center"}>
                <Card
                  w={"70%"}
                  onClick={() => setMenuStatus("SubtaskMenu")}
                  rounded={"3xl"}
                  _hover={{
                    bg: "gray.700",
                    textColor: "white",
                    borderWidth: "1px",
                    borderColor: "white",
                  }}
                >
                  <CardBody>
                    <Text as={"b"}>サブタスク</Text>
                  </CardBody>
                </Card>
                <Card
                  w={"70%"}
                  onClick={backToHome}
                  rounded={"3xl"}
                  _hover={{
                    bg: "gray.700",
                    textColor: "white",
                    borderWidth: "1px",
                    borderColor: "white",
                  }}
                >
                  <CardBody>
                    <Text as={"b"}>
                      中断する
                      <Text pl={"2%"} fontSize={"2xs"} display="inline">
                        ホーム画面に戻ります
                      </Text>
                    </Text>
                  </CardBody>
                </Card>
                <Card
                  onClick={() => setMenuStatus("AddMinutesMenu")}
                  w={"70%"}
                  rounded={"3xl"}
                  _hover={{
                    bg: "gray.700",
                    textColor: "white",
                    borderWidth: "1px",
                    borderColor: "white",
                  }}
                >
                  <CardBody>
                    <Text as={"b"}>回復する（時間を追加する）</Text>
                  </CardBody>
                </Card>
              </Stack>
            </motion.div>
          </>
        ) : (
          <></>
        )}

        {menuStatus === "AddMinutesMenu" ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={variants.animate}
              transition={variants.transition}
            >
              <Stack pt={"10%"} spacing={"5"} align={"center"}>
                {addTimeOptions.map((option) => (
                  <Card
                    onClick={() => handleToAddMinutesFromMenu(option.value)}
                    w={"70%"}
                    pl={"5%"}
                    rounded={"3xl"}
                    key={option.value}
                    size={"sm"}
                    bg={
                      initialTask.totalMinutes * 60 <
                      totalSeconds + option.value * 60
                        ? "gray.300"
                        : "white"
                    }
                    _hover={
                      initialTask.totalMinutes * 60 <
                      totalSeconds + option.value * 60
                        ? {}
                        : {
                            bg: "gray.700",
                            textColor: "white",
                            borderWidth: "1px",
                            borderColor: "white",
                          }
                    }
                  >
                    <CardBody>
                      <Flex align="center" justifyContent={"space-between"}>
                        <Text fontSize={"md"}>{option.value}分延長する</Text>

                        <BsCapsule size={"5%"} />
                      </Flex>
                    </CardBody>
                  </Card>
                ))}
                <Card
                  onClick={() => setMenuStatus("BaseMenu")}
                  w={"70%"}
                  rounded={"3xl"}
                  _hover={{
                    bg: "gray.700",
                    textColor: "white",
                    borderWidth: "1px",
                    borderColor: "white",
                  }}
                >
                  <CardBody>
                    <Text as={"b"}>戻る</Text>
                  </CardBody>
                </Card>
              </Stack>
            </motion.div>
          </>
        ) : (
          <></>
        )}
      </Stack>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={variants.animate}
        transition={variants.transition}
      >
        <VStack
          pt={"5.5%"}
          spacing={6}
          w={"full"}
          maxW={"xl"}
          ml="10%"
          mr={"10%"}
        >
          <Box
            w={"full"}
            bg="white" // 任意の色を選択
            pr={10}
            pb={5}
            pl={12}
            display="flex" // Flexコンテナとして設定
            flexDirection="column" // 子要素を縦に並べる
            alignItems="center" // 横方向の中央揃え
            justifyContent="center"
            rounded={"40"}
          >
            <Text fontSize={"lg"} as="b" textAlign={"center"}>
              あと
              <Text as="i" fontSize="4xl" display="inline" pr={2}>
                {progressValue}
              </Text>
              ％です。
            </Text>
            <CustomProgressBar
              value={progressValue}
              width="full"
              size="lg"
              height="20px"
            />
          </Box>

          <Image
            mt={"10%"}
            rounded={20}
            boxSize="300px"
            src={imageurl ?? "defaultImageUrl"}
            alt="monster"
            shadow={"xl"}
          />
          <Heading pt={"7%"} color={"white"}>
            {initialTask.title}
          </Heading>
          <EndOfBattleModal isOpen={isOpen} onClose={onClose} />
          <TimeUpModal
            isOpen={isTimeUpOpen}
            onClose={onTimeUpClose}
            id={router.query.id}
            setRemainingTotalSeconds={setRemainingTotalSeconds}
            restart={restart}
            initialSeconds={initialTask.totalMinutes * 60}
            handleToAddMinutesSubmit={handleToAddMinutesSubmit}
            handleToAddMinutesChange={handleToAddMinutesChange}
            backToHome={backToHome}
            minutesToAdd={minutesToAdd}
            setProgrammaticNavigation={setProgrammaticNavigation}
          />
        </VStack>
      </motion.div>
    </SimpleGrid>
  );
};

export default BattleTask;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let initialTask: taskForDisplay;
  const id = context.params?.id;

  try {
    initialTask = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        subTasks: true,
      },
    });
  } catch (error) {
    console.error("prisma.task.finduniqueの呼び出しに失敗:", error);
  }
  const imageurl = context.query.imageurl as string | undefined;

  return {
    props: {
      initialTask,
      imageurl,
    },
  };
};
