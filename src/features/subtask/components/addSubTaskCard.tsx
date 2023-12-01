import { Card, CardBody, HStack, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

type AddSubTaskCardProps = {
  handleInputChange: () => void; // handleInputChange関数の型定義
};

export const AddSubTaskCard = ({ handleInputChange }: AddSubTaskCardProps) => {
  return (
    <Card h={20} mt={5} w="2/3" backgroundColor="gray.50" rounded={30}>
      <CardBody>
        <HStack>
          <IconButton
            isRound={true}
            variant="solid"
            aria-label="Done"
            fontSize="20px"
            icon={<AddIcon />}
            onClick={handleInputChange}
          />
        </HStack>
      </CardBody>
    </Card>
  );
};
