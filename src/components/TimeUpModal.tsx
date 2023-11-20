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

type TimeUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  totalSeconds: number;
  setRemainingTotalSeconds: Dispatch<SetStateAction<number>>;
  setProgrammaticNavigation:(optionMinutes: boolean) => void;
  restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void;
  initialSeconds: number | null;
  handleToAddMinutesSubmit: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleToAddMinutesChange: () => void;
  minutesToAdd: number;
  backToHome:(optionMinutes:number|null)=> Promise<void>
 
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
 backToHome,
 setProgrammaticNavigation
}: TimeUpModalProps) => {
  
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
          <Button
            colorScheme="blue"
            mr={3}
            onClick={async() =>{
              setProgrammaticNavigation(true)
              await backToHome(10)
            }}
          >
            一度諦める
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
