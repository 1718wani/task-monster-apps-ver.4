import { Card, CardBody, Text } from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";
import { type BattleMenuStatus } from "../types/BattleMenuStatus";

type Props = {
  setMenuStatus: Dispatch<SetStateAction<BattleMenuStatus>>;
};

export const BackToBaseMenuButton = ({ setMenuStatus }: Props) => {
  return (
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
  );
};
