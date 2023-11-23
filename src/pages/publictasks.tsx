import type { NextPage } from "next";
import { Publictasks } from "~/features/tasklist/page-components/public-tasks";

const PublicTasksPage: NextPage = (props) => {
  return <Publictasks {...props} />;
};

export default PublicTasksPage;
