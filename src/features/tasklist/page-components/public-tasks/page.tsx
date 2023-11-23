import { Box, Spinner } from "@chakra-ui/react";
import { useGetPublicTasksWithSwr } from "../../hooks/useGetPublicTasks";
import { useState } from "react";
import { PaginationButtons } from "../../components/paginationButtons";
import { PublicTasksComponent } from "../../components/publicTasksComponent";

export const Publictasks = () => {
  const [pageIndex,setPageIndex] = useState(0)
  const [limitIndex] = useState(9)
  const data = useGetPublicTasksWithSwr(pageIndex,limitIndex);
  const nextData =  useGetPublicTasksWithSwr(pageIndex + 1 ,limitIndex);

  return (
    <>
      {data.isLoading && <Spinner />}
      {data.error && (
        <Box>APIからデータの取得に失敗しました: {data.error.message}</Box>
      )}
      {data.publishedTasks && <PublicTasksComponent tasks={data.publishedTasks}/>}
      <Box display={"none"}>
          <PublicTasksComponent tasks={nextData.publishedTasks}/>
      </Box>

      <PaginationButtons nextTasks={nextData.publishedTasks} pageIndex={pageIndex} setPageIndex={setPageIndex} />
    </>
  );
};
