import { HStack } from "@chakra-ui/react";
import { type subTaskReactHookFormType } from "../types/subTaskReactHookFormType";
import { type subTasksInputType } from "../types/subTasksInputType";
import { type subTaskInputType } from "../types/subTaskInputType";
import { SubmitOrBackButtons } from "./submitOrBackButtons";
import { AddSubTaskCard } from "./addSubTaskCard";
import { SubTaskItemCard } from "./SubTaskItemCard";

type onSubmitSubTaskType = {
  onSubmit: (data: subTasksInputType) => Promise<void>;
};

type extendedSubtaskFormProps = onSubmitSubTaskType & subTaskReactHookFormType;

export const SubTasksFormComponent = (subTasksForm: extendedSubtaskFormProps) => {
  const handleInputChange = () => {
    const currentTasks = subTasksForm.getValues().subTasks;
    currentTasks.push({ subTaskTitle: "", estimatedMinutes: 15 });
    subTasksForm.setValue("subTasks", currentTasks);
  };

  const handleItemDiscard = (index: number) => {
    const currentTasks: subTaskInputType[] = subTasksForm.getValues().subTasks;
    currentTasks.splice(index, 1);
    subTasksForm.setValue("subTasks", currentTasks);
  };

  return (
    <>
      <form onSubmit={subTasksForm.handleSubmit(subTasksForm.onSubmit)}>
        {subTasksForm.getValues("subTasks").map((subTask, index) => (
          <SubTaskItemCard
            key={index}
            subTask={subTask}
            index={index}
            handleItemDiscard={handleItemDiscard}
            {...subTasksForm}
          />
        ))}

        {subTasksForm.getValues("subTasks").length < 8 && (
          <AddSubTaskCard handleInputChange={handleInputChange} />
        )}

        <HStack pt={"5%"} spacing={6}>
          <SubmitOrBackButtons props={subTasksForm} />
        </HStack>
      </form>
    </>
  );
};
