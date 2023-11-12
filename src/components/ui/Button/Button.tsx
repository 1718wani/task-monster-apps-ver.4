import { Button } from "@chakra-ui/react";
import { FaSearchengin } from "react-icons/fa";
import { useRouter } from "next/router";
import { CreateNewMonsterButtonComponentProps } from "./ButtonType";

export const CreateNewMonsterButtonComponent  : React.FC< CreateNewMonsterButtonComponentProps  > = ({ onClick }) => {
  return (
    <Button
      padding="10"
      leftIcon={<FaSearchengin />}
      position="fixed"
      right={28}
      bottom={28}
      colorScheme="teal"
      shadow={20}
      boxShadow="dark-lg"
      rounded="full"
      onClick={onClick}
    >
      モンスターを探す
    </Button>
  );
};

export default CreateNewMonsterButtonComponent;





