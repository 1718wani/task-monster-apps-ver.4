import { Box, Text, VStack } from "@chakra-ui/react";
import CustomProgressBar from "./ui/ProgressBar/CustomeProgressBar";
import { ProgressStatus } from "~/types/AllTypes";

type TimerOfTaskComponentProps = {
  totalSeconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  initialAmountSeconds: number;
  progressValueOfTimer:number;
  progressStatusOfTimer:ProgressStatus;
};

export const TimerOfTaskComponent = ({
  totalSeconds,
  seconds,
  minutes,
  hours,
  initialAmountSeconds,
  progressValueOfTimer,
  progressStatusOfTimer,
}: TimerOfTaskComponentProps) => {

  return (
    <>
      <VStack>
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
        <Text mb={1} fontSize={"lg"} as="b">
          あと
          <Text pl={1} as="i" fontSize="4xl" display="inline" pr={2}>
            {hours}時間:{minutes}分:{seconds}秒
          </Text>
          です
        </Text>

        <CustomProgressBar
          width={"full"}
          size="lg"
          height="20px"
          // isCountingDownのときだけ、progressValueOfTimerの値が表示される。
          value={( ((progressStatusOfTimer === "isCountingUp")? progressValueOfTimer : totalSeconds) / initialAmountSeconds) * 100}
        />
        </Box>
    
      </VStack>
    </>
  );
};
