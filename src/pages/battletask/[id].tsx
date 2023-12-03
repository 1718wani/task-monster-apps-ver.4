import type { GetServerSidePropsContext, NextPage } from "next";

import { getOneTaskFromServerSide } from "~/features/battle/functions/getOneTaskFromServerSide";

import { BattleTaskComponent } from "~/features/battle/page-components/page";
import { NoTaskComponent } from "~/features/battle/components/NoTaskComponent";
import { NoSubTasksComponent } from "~/features/battle/components/NoSubTasksComponent";
import { type TaskIncludingSubTasksWithTotalMinutes } from "~/types/TaskIncludingSubTasksWithTotalMinutes";
import { type TaskIncludingSubTasks } from "~/types/TaskIncludingSubTasks";

export type forBattleProps = {
  initialTask: TaskIncludingSubTasks | null;
  imageurl: string | undefined;
};

export const BattleTaskPage: NextPage<forBattleProps> = ({
  initialTask,
  imageurl,
}) => {
  if (initialTask === null) {
    return <NoTaskComponent />;
  } else if (initialTask.totalMinutes === null) {
    return <NoSubTasksComponent />;
  } else {
    const initilaTaskWithTotalMinutes: TaskIncludingSubTasksWithTotalMinutes =
      initialTask as TaskIncludingSubTasksWithTotalMinutes;
    return (
      <BattleTaskComponent
        initialTask={initilaTaskWithTotalMinutes}
        imageurl={imageurl}
      />
    );
  }
};

export default BattleTaskPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id as string;
  const data = await getOneTaskFromServerSide({ id });

  const imageurl = context.query.imageurl as string | undefined;

  const battleProps: forBattleProps = {
    initialTask: data,
    imageurl: imageurl,
  };

  return {
    props: battleProps,
  };
};
