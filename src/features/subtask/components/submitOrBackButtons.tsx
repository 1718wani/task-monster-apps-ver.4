import { Button } from "@chakra-ui/react";
import router from "next/router";
import { type subTaskReactHookFormType } from "../types/subTaskReactHookFormType";

type SubTaskButtonGroupProps = {
  props: subTaskReactHookFormType;
};

export const SubmitOrBackButtons = ({ props }: SubTaskButtonGroupProps) => {
  return (
    <>
      <Button
        colorScheme={"blue"}
        variant={"solid"}
        loadingText="送信中です"
        isLoading={props.isSubmitting}
        type="submit"
      >
        戦いを始める
      </Button>
      <Button
        colorScheme={"blue"}
        variant={"outline"}
        onClick={() => router.back()}
      >
        一度戦いをやめる
      </Button>
    </>
  );
};
