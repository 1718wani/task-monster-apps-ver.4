import { Box, Spinner } from "@chakra-ui/react";
import { Task } from "@prisma/client";
import type { NextPage } from "next";
import { Publictasks } from "~/features/tasklist/page-components/my-tasks";

const PublicTasksPage: NextPage = (props) => {
  return(
    <Publictasks {...props} />
  )
};

export default PublicTasksPage;
