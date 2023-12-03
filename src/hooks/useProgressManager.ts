import { useState } from "react";
import { useInterval } from "usehooks-ts";
import type { ProgressStatus } from "~/types/AllTypes";

type UseProgressOptions = {
  initialProgressValue: number;
  targetProgressValue: number;
  duration:number;
  onReachZero?: () => void;
  onReachCountingUpTarget?: () => void;
};

export const UseProgressManager = ({
  initialProgressValue, // 最初のProgressValue
  targetProgressValue, // 目指すprogressValue
  duration,
  onReachZero, // ０になったときに呼び出すメソッド
  onReachCountingUpTarget, // カウントアップ時にprogressValue>=targetProgressValueになった際呼び出し
}: UseProgressOptions) => {
  const [progressValue, setProgressValue] = useState(initialProgressValue);
  const [progressStatus, setProgressStatus] =
    useState<ProgressStatus>("neutral");

  useInterval(
    () => {
      if (progressStatus === "isCountingDown") {
        if (progressValue === 0) {
          if (onReachZero) {
            onReachZero();
          }
        }
        if (progressValue > targetProgressValue) {
          setProgressValue((prev) => prev - 1);
        } else {
          setProgressStatus("neutral");
        }
      } else if (progressStatus === "isCountingUp") {
        if (progressValue < targetProgressValue) {
          setProgressValue((prev) => prev + 1);
        } else {
          if (onReachCountingUpTarget) {
            onReachCountingUpTarget();
            
          }
          setProgressStatus("neutral");
        }
      }
    },
    progressStatus !== "neutral" ? duration : null
  );

  return {
    progressValue,
    setProgressValue,
    progressStatus,
    setProgressStatus,
    onReachZero,
    onReachCountingUpTarget,
  };
};
