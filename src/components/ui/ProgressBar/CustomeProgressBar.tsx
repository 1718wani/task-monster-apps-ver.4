import { Progress } from "@chakra-ui/react";
import type { CustomProgressBarProps } from "./CustomProgressBarProps";

const CustomProgressBar = ({ value, ...rest }: CustomProgressBarProps) => {
  let colorScheme;

  if (value < 21) {
    colorScheme = "red";
  } else if (value >= 21 && value < 50) {
    colorScheme = "yellow";
  } else {
    colorScheme = "teal";
  }

  return (
    <Progress
      colorScheme={colorScheme}
      value={value}
      isAnimated
      hasStripe
      shadow="dark-lg"
      rounded="lg"
      {...rest}
    />
  );
};

export default CustomProgressBar;
