import { Grid } from "@chakra-ui/react";
import type { Task } from "@prisma/client";
import { useCategorizedData } from "../hooks/useCategorizeData";
import { PieChartComponent } from "../components/PieChartComponent";
import { SumOfChartComponent } from "../components/SumOfChartComponent";
import { categorizeTasks } from "~/util/reducers/categorizeTasks";

type props = {
  data: Task[];
};

export const Statistics = ({ data }: props) => {
  const categorizedData = useCategorizedData(data);

  return (
    <>
      <Grid m={"5%"} templateColumns={["1fr", null, "1fr 1fr"]} gap={"5%"}>
        <SumOfChartComponent
          numberOfFinishedTask={categorizeTasks(data).isCompletedTasks.length}
        />
        <PieChartComponent categorizedData={categorizedData} />
      </Grid>
    </>
  );
};
