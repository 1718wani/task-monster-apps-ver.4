import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { baseUrl } from "~/consts/url-paths";
import { CompleteBattleSuccess } from "~/notifications/notifications";

type publicApiFormInputs = {
  publishedTitle: string;
  publishedStrategy: string;
};

type modalStatus = {
  isOpen:boolean,
  onClose:() => void,
}

export const EndOfBattleModal = ({ isOpen, onClose }:modalStatus) => {
  const router = useRouter();
  const { id } = router.query;

  const initialRef = useRef(null);

  // useStateを使ってフォームのデータを管理
  const [formData, setFormData] = useState<publicApiFormInputs>({
    publishedTitle: "",
    publishedStrategy: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // フォームのデフォルトの送信動作を防ぐ

    console.log(formData, "送ったデータ");

    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `${baseUrl}/api/tasks/${id as string}`,
        {
          isPublished: true,
          isCompleted: true,
          ...formData,
        }
      );

      console.log(response.data, "完了時のresponse.data");

      await router.push("/");
      CompleteBattleSuccess();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <form onSubmit={onSubmit}>
          <ModalContent>
            <ModalHeader>討伐完了です！おめでとうございます！</ModalHeader>
            <ModalBody pb={6}>
              <Text fontSize={"sm"} mb={4}>
                この討伐を公開することで、他のユーザーがこの討伐を参考にできるようになります。
                ※ この討伐を公開しても元のタスクのタイトルは公開されません。
              </Text>

              <FormControl>
                <FormLabel>公開するモンスターの名前</FormLabel>
                <Input
                  type="text"
                  name="publishedTitle"
                  value={formData.publishedTitle}
                  onChange={handleChange}
                  ref={initialRef}
                  placeholder="例）やっと継続3日目のシャドーイング練習"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>倒し方のコツ</FormLabel>
                <Input
                  type="text"
                  name="publishedStrategy"
                  value={formData.publishedStrategy}
                  onChange={handleChange}
                  placeholder="ロールモデルが喋るYoutubeを題材にする！"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                loadingText="送信中です"
                isLoading={isSubmitting}
                type="submit"
              >
                討伐内容を公開する
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      <Toaster />
    </>
  );
};
