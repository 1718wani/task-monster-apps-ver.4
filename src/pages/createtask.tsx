import type { NextPage } from "next";
import { CreateTask } from "~/features/task/page-components";

export const CreateTaskPage: NextPage = (props) => {
  return <CreateTask {...props} />;
};

export default CreateTaskPage;
