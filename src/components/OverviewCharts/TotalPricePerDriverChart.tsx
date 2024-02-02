import React, { useEffect, useState } from "react";
import {
  Card,
  Metric,
  Text,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  ProgressBar,
} from "@tremor/react";
import { LoadDetail } from "../Types/types";

interface TotalPricePerDriverChartProps {
  loadDetails: LoadDetail[];
}

const TotalPricePerDriverChart: React.FC<TotalPricePerDriverChartProps> = ({
  loadDetails,
}) => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [timeRanges, setTimeRanges] = useState<{ [key: string]: number }>({
    week: 0,
    month: 0,
    quarter: 0,
    year: 0,
  });

  const [selectedTab, setSelectedTab] = useState<string>("week");

  useEffect(() => {
    calculateTotalRevenue();
  }, [loadDetails, selectedTab]);

  useEffect(() => {
    calculateTimeRangeRevenue();
  }, [totalRevenue, selectedTab]);

  const calculateTotalRevenue = () => {
    let total = 0;
    const filteredLoadDetails = loadDetails.filter((load) => {
      const deliveryTime = new Date(load.deliveryTime);
      const currentDate = new Date();

      switch (selectedTab) {
        case "week":
          const currentWeekStart = new Date(currentDate);
          currentWeekStart.setDate(
            currentWeekStart.getDate() -
              currentDate.getDay() +
              (currentDate.getDay() === 0 ? -6 : 1)
          );
          return deliveryTime >= currentWeekStart;

        case "month":
          const currentMonthStart = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          return deliveryTime >= currentMonthStart;

        case "quarter":
          const currentQuarterStart = new Date(
            currentDate.getFullYear(),
            Math.floor(currentDate.getMonth() / 3) * 3,
            1
          );
          return deliveryTime >= currentQuarterStart;

        case "year":
          const currentYearStart = new Date(currentDate.getFullYear(), 0, 1);
          return deliveryTime >= currentYearStart;

        default:
          return true;
      }
    });

    filteredLoadDetails.forEach((load) => {
      const price = parseFloat(load.price) || 0;
      total += price;
    });

    console.log(`Total Revenue calculated: $${total}`);
    setTotalRevenue(total);
  };

  const calculateTimeRangeRevenue = () => {
    const timeRangesCopy = { ...timeRanges };

    Object.keys(timeRangesCopy).forEach((range) => {
      const filteredLoadDetails = loadDetails.filter((load) => {
        const deliveryTime = new Date(load.deliveryTime);
        const currentDate = new Date();

        switch (range) {
          case "week":
            const currentWeekStart = new Date(currentDate);
            currentWeekStart.setDate(
              currentWeekStart.getDate() -
                currentDate.getDay() +
                (currentDate.getDay() === 0 ? -6 : 1)
            );
            return deliveryTime >= currentWeekStart;

          case "month":
            const currentMonthStart = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              1
            );
            return deliveryTime >= currentMonthStart;

          case "quarter":
            const currentQuarterStart = new Date(
              currentDate.getFullYear(),
              Math.floor(currentDate.getMonth() / 3) * 3,
              1
            );
            return deliveryTime >= currentQuarterStart;

          case "year":
            const currentYearStart = new Date(currentDate.getFullYear(), 0, 1);
            return deliveryTime >= currentYearStart;

          default:
            return true;
        }
      });

      let rangeTotal = 0;
      filteredLoadDetails.forEach((load) => {
        const price = parseFloat(load.price) || 0;
        rangeTotal += price;
      });

      console.log(`Revenue for ${range} calculated: $${rangeTotal}`);
      timeRangesCopy[range] = rangeTotal;
    });

    console.log("Time Range Revenue calculated:", timeRangesCopy);
    setTimeRanges({ ...timeRangesCopy });
  };

  return (
    <div className="chart-container">
      <Card className="min-w-xs" decoration="top" decorationColor="blue">
        <div>
          <Text>Total Revenue</Text>
          <Metric>{`$ ${new Intl.NumberFormat("us")
            .format(totalRevenue)
            .toString()}`}</Metric>
        </div>
        <TabGroup>
          <TabList className="mt-2 p-1">
            <Tab onClick={() => setSelectedTab("week")}>Week</Tab>
            <Tab onClick={() => setSelectedTab("month")}>Month</Tab>
            <Tab onClick={() => setSelectedTab("quarter")}>Quarter</Tab>
            <Tab onClick={() => setSelectedTab("year")}>Year</Tab>
          </TabList>
          <TabPanels>
            {Object.keys(timeRanges).map((range) => (
              <TabPanel key={range}>
                <div className="mt-0">
                  {/* <ProgressBar value={(timeRanges[range] / totalRevenue) * 100} className="mt-2" /> */}
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  );
};

export default TotalPricePerDriverChart;
