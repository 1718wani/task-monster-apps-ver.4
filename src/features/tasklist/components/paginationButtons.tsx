import { Button } from "@chakra-ui/react";
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
      <Button
        isDisabled={pageIndex === 0}
        onClick={() => setPageIndex(pageIndex - 1)}
      >
        Previous
      </Button>
      <Button
        isDisabled={
          nextTasks === null ||
          nextTasks === undefined ||
          nextTasks.length === 0
        }
        onClick={() => setPageIndex(pageIndex + 1)}
      >
        Next
      </Button>
    </>
  );
};
