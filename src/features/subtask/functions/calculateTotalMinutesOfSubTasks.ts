import { type subTaskReactHookFormType } from "../types/subTaskReactHookFormType";

export const calculateTotalMinutesOfSubTasks = (
  subTasksForm: subTaskReactHookFormType
) => {
  return subTasksForm.watch("subTasks").reduce((sum, subTask) => {
    if (
      Number.isInteger(subTask.estimatedMinutes) &&
      subTask.estimatedMinutes > 0
    ) {
      return sum + subTask.estimatedMinutes;
    }
    return sum;
  }, 0);
};
