import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
  Progress,
  Skeleton,
  ModalFooter,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import router from "next/router";
import { type TaskGeneratingModalProps } from "../types/taskGeneratingModalProps";

export const TaskGeneratingModal = ({
  isOpen,
  onClose,
  formProps,
  apiResponse,
}: TaskGeneratingModalProps) => {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {formProps.isSubmitting && <Box>現在モンスターを作成しています</Box>}
          {formProps.isSubmitSuccessful && (
            <Box>モンスターの作成が成功しました！</Box>
          )}
        </ModalHeader>
        <ModalBody>
          <VStack>
            {formProps.isSubmitting && (
              <Progress
                w={"full"}
                colorScheme="blue"
                rounded={"lg"}
                size="md"
                isIndeterminate
              />
            )}
            {formProps.isSubmitting && (
              <Skeleton rounded={20} boxSize="300px" />
            )}
            {formProps.isSubmitSuccessful && (
              <Image
                rounded={20}
                boxSize="300px"
                src={apiResponse?.imageData ? apiResponse?.imageData : ""}
                alt="monster"
                shadow={"xl"}
              />
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          {formProps.isSubmitSuccessful && (
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={async () => await router.push("/")}
            >
              ホームに戻る
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
