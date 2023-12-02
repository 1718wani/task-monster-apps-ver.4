import { SimpleGrid, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SubTaskFormImageAndStatus } from "../components/subTaskFormImageAndStatus";
import { SubTasksFormComponent } from "../components/subTasksFormComponent";
import { onSubmitSubTasksForm } from "../functions/onSubmitSubTasksForm";
import { useSubTaskCreateForm } from "../hooks/useSubTasksCreateForm";

export const CreateSubTask = () => {
  const router = useRouter();
  const { id: idQuery, imageurl: imageurlQuery } = router.query;
  const id = Array.isArray(idQuery) ? idQuery[0] : idQuery;
  const imageurl = Array.isArray(imageurlQuery)
    ? imageurlQuery[0]
    : imageurlQuery;

  const subTasksForm = useSubTaskCreateForm();

  return (
    <>
      <SimpleGrid columns={2} spacingY="10px" alignItems={"center"} py="5%">
        <Center>
          <Stack spacing={4} w={"full"} maxW={"xl"} justify="center" ml="50">
            <Heading fontSize={"2xl"}>
              {router.query.title}の体力ゲージを設定する
            </Heading>
            <Text>サブタスクに分解して、工数（分）を入力してください</Text>
            <SubTasksFormComponent
              {...subTasksForm}
              onSubmit={(data) =>
                onSubmitSubTasksForm(data, id, imageurl, subTasksForm)
              }
            />
          </Stack>
        </Center>
        <SubTaskFormImageAndStatus
          imageUrl={imageurl}
          subTaskForm={subTasksForm}
        />
      </SimpleGrid>
    </>
  );
};
