import { Box, Heading, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Cell, Pie } from "recharts";
import { colorListForCharts } from "../consts/colorListForCharts";

type categorizedDataProps = {
  name: string;
  value: number;
};

type props = {
  categorizedData: categorizedDataProps[];
};

const PieChart = dynamic(
  () => import("recharts").then((recharts) => recharts.PieChart),
  { ssr: false }
);

export const PieChartComponent = ({ categorizedData }: props) => {
  const renderCustomLabel = ({ name, value }: categorizedDataProps) => {
    return `${name}:${value}`;
  };
  return (
    <Box bg={"white"} p={"10%"} rounded={"130"} shadow={"xl"} w={"90%"}>
      <VStack spacing={10}>
        <Heading>ステータス割合</Heading>
      <PieChart width={730} height={250}>
        <Pie
          data={categorizedData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label={renderCustomLabel}
        >
          {categorizedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorListForCharts[index]} />
          ))}
        </Pie>
      </PieChart>
      </VStack>
    </Box>
  );
};
