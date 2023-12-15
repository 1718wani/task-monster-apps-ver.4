import type { Task } from "@prisma/client";
import useSWR from "swr";
import { baseUrl } from "~/consts/url-paths";
import { fetcher } from "~/lib/swr-fetcher";

export const useGetPublicTasksWithSwr = (page?: number, limit?: number) => {
  const {
    data: publishedTasks,
    error,
    isLoading,
  } = useSWR<Task[], Error>(
    () => `${baseUrl}/api/publicTasks/?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    publishedTasks,
    error,
    isLoading,
  };
};
