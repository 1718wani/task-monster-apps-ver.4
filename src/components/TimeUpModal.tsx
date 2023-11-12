import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { NextRouter, Router, useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { addTimeOptions } from "~/pages/battletask/[id]";

// timetoAddをそもそも更新させちゃえばよくね？
// やっていること同じやん！強いていえば、モーダルを終了させているぐらい。
// じゃあTiem toaddもカスタムフックの状態変数も持って来ればよくねえか

type TimeUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  totalSeconds: number;
  setRemainingTotalSeconds: Dispatch<SetStateAction<number>>;
  restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void;
  initialSeconds: number | null;
  handleToAddMinutesSubmit :(event: React.ChangeEvent<HTMLSelectElement>) => void
  handleToAddMinutesChange: () => void
  minutesToAdd:number;
};

export const TimeUpModal = ({
  isOpen,
  onClose,
  id,
  totalSeconds,
  setRemainingTotalSeconds,
  restart,
  initialSeconds,
  handleToAddMinutesSubmit,
  handleToAddMinutesChange,
  minutesToAdd,
}: TimeUpModalProps) => {

  

  // const handleSubmit = async () => {
  //   console.log(time, "延長時のTime");
  //   console.log(id, "延長時のTaskのID");

  //   try {
  //     const response = await axios.put(
  //       `http://localhost:3000/api/tasks/${id}`,
  //       {
  //         isOnGoing: true,
  //         remainingMinutes: time,
  //       }
  //     );
  //     console.log(response.data, "これが分数追加時のデータ");

  //     onClose();
  //     router.reload();
  //   } catch (error) {
  //     console.error("Error updating totalminutes of task:", error);
  //   }
  // };
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>時間切れです！</ModalHeader>
        <ModalBody>
          設定した時間が終了しました！あと何分で倒せそうですか？
          <Select onChange={handleToAddMinutesChange}>
            <option value={0} disabled selected>
              選択してください
            </option>
            {addTimeOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.value * 60 > initialSeconds}
              >
                {option.value}
              </option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleToAddMinutesSubmit}>
            {minutesToAdd}分だけ延長する
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            一度諦める
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
