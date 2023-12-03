import { Button, HStack } from "@chakra-ui/react";
import type { Task } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";

type props = {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  nextTasks: Task[] | null | undefined;
};

export const PaginationButtons = ({
  pageIndex,
  setPageIndex,
  nextTasks,
}: props) => {
  return (
    <>
      <HStack>
        <Button
          colorScheme="teal"
          isDisabled={pageIndex === 0}
          onClick={() =>setPageIndex(prevPageIndex => prevPageIndex - 1)}
        >
          前へ
        </Button>
        <Button
          colorScheme="teal"
          isDisabled={
            nextTasks === null ||
            nextTasks === undefined ||
            nextTasks.length === 0
          }
          onClick={() => setPageIndex(prevPageIndex => prevPageIndex + 1)}
        >
          次へ
        </Button>
      </HStack>
    </>
  );
};
