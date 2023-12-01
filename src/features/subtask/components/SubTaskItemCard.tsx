import {
    Flex,
    Card,
    CardBody,
    FormControl,
    Input,
    FormErrorMessage,
    Divider,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    IconButton,
  } from "@chakra-ui/react";
  import { Controller } from "react-hook-form";
  import { DeleteIcon } from "@chakra-ui/icons";
  import { type subTaskReactHookFormType } from "../types/subTaskReactHookFormType";
  import { type subTaskInputType } from "../types/subTaskInputType";
  
  type SubTaskCardProps = subTaskReactHookFormType & {
    subTask: subTaskInputType;
    index: number;
    handleItemDiscard: (index: number) => void;
  };
  
  export const SubTaskItemCard = ({
    subTask,
    index,
    handleItemDiscard,
    register,
    control,
    errors,
    watch,
  }: SubTaskCardProps) => {
    return (
      <Card rounded="30" mt={5}>
        <CardBody>
          <Flex>
            {/* タスクタイトル入力部分 */}
            <FormControl
              id={`subTask${index}`}
              isInvalid={
                errors?.subTasks?.[index]?.subTaskTitle ??
                errors?.subTasks?.[index]?.estimatedMinutes
                  ? true
                  : false
              }
            >
              <Input
                id={`subTask${index}Text`}
                type="text"
                border="none"
                {...register(`subTasks.${index}.subTaskTitle`)}
                placeholder={`サブタスク${index + 1}`}
                w={80}
                fontSize={"sm"}
              />
              <FormErrorMessage fontSize="xs">
                {errors?.subTasks?.[index]?.subTaskTitle?.message}
              </FormErrorMessage>
            </FormControl>
  
            <Divider orientation="vertical" borderColor="gray.300" height="40px" />
  
            {/* 予想時間入力部分 */}
            <FormControl
              id={`manPowerPerSubtask${index}`}
              isInvalid={errors?.subTasks?.[index]?.estimatedMinutes ? true : false}
            >
              <Controller
                name={`subTasks.${index}.estimatedMinutes`}
                control={control}
                defaultValue={15}
                render={({ field }) => (
                  <NumberInput
                    id={`estimatedMinutes${index}`}
                    step={5}
                    onChange={(valueString) => field.onChange(parseInt(valueString, 10))}
                    value={field.value}
                    border={"white"}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              <FormErrorMessage fontSize="xs">
                {errors?.subTasks?.[index]?.estimatedMinutes?.message}
              </FormErrorMessage>
            </FormControl>
  
            {/* 削除ボタン */}
            {watch("subTasks").length >= 4 && (
              <IconButton
                m={2}
                size={"xs"}
                isRound={true}
                variant="solid"
                aria-label="Delete Task"
                fontSize="14px"
                colorScheme="red"
                onClick={() => handleItemDiscard(index)}
                icon={<DeleteIcon />}
              />
            )}
          </Flex>
        </CardBody>
      </Card>
    );
  };
  