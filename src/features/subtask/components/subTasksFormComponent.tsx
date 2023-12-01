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

export const SubTasksFormComponent = (props: extendedSubtaskFormProps) => {
  const handleInputChange = () => {
    const currentTasks = props.getValues().subTasks;
    currentTasks.push({ subTaskTitle: "", estimatedMinutes: 15 });
    props.setValue("subTasks", currentTasks);
  };

  const handleItemDiscard = (index: number) => {
    const currentTasks: subTaskInputType[] = props.getValues().subTasks;
    currentTasks.splice(index, 1);
    props.setValue("subTasks", currentTasks);
  };

  return (
    <>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.watch("subTasks").map((subTask, index) => (
          <SubTaskItemCard
            key={index}
            subTask={subTask}
            index={index}
            handleItemDiscard={handleItemDiscard}
            {...props}
          />
        ))}

        {props.watch("subTasks").length < 8 && (
          <AddSubTaskCard handleInputChange={handleInputChange} />
        )}

        <HStack pt={"5%"} spacing={6}>
          <SubmitOrBackButtons props={props} />
        </HStack>
      </form>
    </>
  );
};
