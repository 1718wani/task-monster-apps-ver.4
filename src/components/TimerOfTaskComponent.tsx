import { Text, VStack } from "@chakra-ui/react";
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
        <Text mb={4} fontSize={"lg"} as="b">
          あと
          <Text pl={1} as="i" fontSize="4xl" display="inline" pr={2}>
            {hours}時間:{minutes}分:{seconds}秒
          </Text>
          です
        </Text>

        <CustomProgressBar
          width={"full"}
          size="lg"
          height="25px"
          // isCountingDownのときだけ、progressValueOfTimerの値が表示される。
          value={( ((progressStatusOfTimer === "isCountingUp")? progressValueOfTimer : totalSeconds) / initialAmountSeconds) * 100}
        />
      </VStack>
    </>
  );
};
