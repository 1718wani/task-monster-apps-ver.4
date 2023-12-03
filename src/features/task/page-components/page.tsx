import { useDisclosure } from "@chakra-ui/react";
import { type Task } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { pagesPath } from "~/lib/$path";
import { TaskCreateFormComponent } from "../components/taskCreateFormComponent";
import { TaskGeneratingModal } from "../components/taskImageGeneratingModal";
import { PostNewTaskDataWithAxios } from "../functions/postNewTaskDataWithAxios";
import { useTaskCreateForm } from "../hooks/useTaskCreateForm";
import { type taskCreateFormInput } from "../types/taskCreateFormInput";

export const CreateTask = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [apiResponse, setApiResponse] = useState<Task>();
  const formProps = useTaskCreateForm();

  const onSubmit = async (data: taskCreateFormInput) => {
    onOpen();
    if (session?.user.userId === undefined) {
      await router.push(pagesPath.signin.$url().pathname);
      return;
    }

    const response = await PostNewTaskDataWithAxios(session?.user.userId, data);
    if (response && typeof response === "object" && "title" in response) {
      setApiResponse(response);
    } else {
      toast.error(response);
    }
  };

  return (
    <>
      <TaskCreateFormComponent {...formProps} onSubmit={onSubmit} />
      <TaskGeneratingModal
        isOpen={isOpen}
        onClose={onClose}
        formProps={formProps}
        apiResponse={apiResponse}
      />
    </>
  );
};
