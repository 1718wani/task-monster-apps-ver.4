import type { GetServerSidePropsContext } from "next";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { HomeTasksAtom } from "~/atoms/atom";

import { getAllMyTasksFromServerSide } from "~/util/fetchers/getAllMyTasksFromServerSide";
import { type HomeProps } from "~/types/HomeProps";
import { HomeList } from "~/features/tasklist/page-components/my-tasks";

export default function Home({ tasks }: HomeProps) {
  const [tasksState, setTasksState] = useAtom(HomeTasksAtom);
  useEffect(() => {
    setTasksState(tasks);
  }, [tasks, setTasksState]); // tasks が変更されたときにのみ useEffect 内の処理を実行する
  console.log(tasksState, "これが最上位のtasksState");

  return (
    <>
      <HomeList tasks={tasksState}></HomeList>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const tasks = await getAllMyTasksFromServerSide(context);

  return {
    props: {
      tasks,
    },
  };
};
