import Chart from "react-apexcharts";

// TYPES
import { ApexOptions } from "apexcharts";

// STYLES
import { Box, SimpleGrid, Text, theme } from "@chakra-ui/react";

// CHART DATA
const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
      "2021-03-24T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};
const series = [{ name: "series1", data: [31, 120, 10, 28, 61, 18, 109] }];

export function Dashboard() {
  return (
    <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
      <Box p="8" bg="gray.800" borderRadius={8} pb="4">
        <Text fontSize="lg" mb="4">
          Subscribers of the week
        </Text>

        <Chart options={options} series={series} type="area" height={160} />
      </Box>

      <Box p="8" bg="gray.800" borderRadius={8}>
        <Text fontSize="lg" mb="4">
          Opening rate
        </Text>

        <Chart options={options} series={series} type="area" height={160} />
      </Box>
    </SimpleGrid>
  );
}
