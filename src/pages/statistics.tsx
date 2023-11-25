import type { Task } from "@prisma/client";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";

import { Statistics } from "~/features/statistics/page-components";

import { getAllMyTasksFromServerSide } from "~/util/fetchers/getAllMyTasksFromServerSide";
type StatisticsPageProps = {
  data: Task[];
};

const StatisticsPage: NextPage<StatisticsPageProps> = ({
  data,
}: StatisticsPageProps) => {
  return <Statistics data={data} />;
};

export default StatisticsPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const data = await getAllMyTasksFromServerSide(context);

  return {
    props: {
      data,
    },
  };
};
