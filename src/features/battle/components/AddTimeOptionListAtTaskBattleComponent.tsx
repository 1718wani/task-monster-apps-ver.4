import { Card, CardBody, Flex, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsCapsule } from "react-icons/bs";
import { addTimeOptions } from "../consts/addTimeOptions";
import { framerMotionVariantsAtBattleTask } from "../consts/framerMotionVariantsAtBattleTask";
import { type Dispatch, type SetStateAction } from "react";
import { type BattleMenuStatus } from "../types/BattleMenuStatus";
import { BackToBaseMenuButton } from "./BackToBaseMenuButton";

type Props = {
  originalTotalMinutes: number;
  remainingTotalSeconds: number;
  setMenuStatus: Dispatch<SetStateAction<BattleMenuStatus>>;
  handleAddMinutesFromMenu: (e: number) => void
};

export const AddTimeOptionListAtTaskBattleComponent = ({
  originalTotalMinutes,
  remainingTotalSeconds,
  setMenuStatus,
  handleAddMinutesFromMenu
}: Props) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={framerMotionVariantsAtBattleTask.animate}
        transition={framerMotionVariantsAtBattleTask.transition}
      >
        <Stack pt={"10%"} spacing={"5"} align={"center"}>
          {addTimeOptions.map((option) => (
            <Card
              onClick={() => handleAddMinutesFromMenu(option.value)}
              w={"70%"}
              pl={"5%"}
              rounded={"3xl"}
              key={option.value}
              size={"sm"}
              bg={
                originalTotalMinutes * 60 <
                remainingTotalSeconds + option.value * 60
                  ? "gray.300"
                  : "white"
              }
              _hover={
                originalTotalMinutes * 60 <
                remainingTotalSeconds + option.value * 60
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
          <BackToBaseMenuButton setMenuStatus={setMenuStatus} />
        </Stack>
      </motion.div>
    </>
  );
};
