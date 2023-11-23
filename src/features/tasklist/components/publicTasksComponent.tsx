import { Flex, Box, Image, Grid, VStack } from "@chakra-ui/react";
import type { Task } from "@prisma/client";

type props = {
  tasks: Task[] | null | undefined;
};

export const PublicTasksComponent = ({ tasks }: props) => {
  if (tasks === null || tasks === undefined) {
    return <></>;
  } else {
    return (
      <>
        <Grid templateColumns={["1fr", null, "1fr 1fr 1fr"]} gap={1}>
          {tasks.map((task) => (
            <Flex
              key={task.id}
              p={50}
              w="full"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
              >
                <Image
                  src={task.imageData ? task.imageData : ""}
                  alt={`Picture of ${task.title}`}
                  roundedTop="lg"
                />

                <Box p="6">
                  <VStack mt="1">
                    <Box
                      fontSize="2xl"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {task.publishedTitle}
                    </Box>
                    <Box
                      fontSize="x-small"
                      fontWeight="semibold"
                      lineHeight="tight"
                      isTruncated
                      color={"gray"}
                    >
                      {task.publishedStrategy}
                    </Box>
                  </VStack>
                </Box>
              </Box>
            </Flex>
          ))}
        </Grid>
      </>
    );
  }
};
