import { Box, Text, VStack } from "@chakra-ui/react";

type props = {
  numberOfFinishedTask: number;
};

export const SumOfChartComponent = ({ numberOfFinishedTask }: props) => {
  return (
    <>
      <Box
        bg={"white"}
        p={40}
        w={"full"}
        h={"full"}
        rounded={"130"}
        shadow={"xl"}
      >
        <VStack h={200} justify={"center"}>
        
          <Text fontSize={"lg"} as="b">
            現在：
            <Text as="i" fontSize="5xl" display="inline" pr={2}>
              {numberOfFinishedTask}
            </Text>
            個完了
          </Text>

          </VStack>
       
      </Box>
    </>
  );
};
