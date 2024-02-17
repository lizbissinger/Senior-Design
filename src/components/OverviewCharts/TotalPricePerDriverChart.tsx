import React, { useEffect, useState } from "react";
import { Card, Metric, Text, Tab, TabGroup, TabList, TabPanel, TabPanels, ProgressBar } from "@tremor/react";
import { LoadDetail } from "../Types/types";

interface TotalPricePerDriverChartProps {
  loadDetails: LoadDetail[];
}

const TotalPricePerDriverChart: React.FC<TotalPricePerDriverChartProps> = ({ loadDetails }) => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>("week");

  const filterLoadDetailsByTimeRange = (range: string) => {
    const currentDate = new Date();
    return loadDetails.filter((load) => {
      const deliveryTime = new Date(load.deliveryTime);
      switch (range) {
        case "week":
          const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1)));
          return deliveryTime >= weekStart;
        case "month":
          const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          return deliveryTime >= monthStart;
        case "quarter":
          const quarterStart = new Date(currentDate.getFullYear(), Math.floor(currentDate.getMonth() / 3) * 3, 1);
          return deliveryTime >= quarterStart;
        case "year":
          const yearStart = new Date(currentDate.getFullYear(), 0, 1);
          return deliveryTime >= yearStart;
        default:
          return false;
      }
    });
  };

  useEffect(() => {
    const calculateAndSetRevenue = () => {
      const filteredLoadDetails = filterLoadDetailsByTimeRange(selectedTab);
      const total = filteredLoadDetails.reduce((acc, load) => acc + (parseFloat(load.price) || 0), 0);
      setTotalRevenue(total);
    };

    calculateAndSetRevenue();
  }, [loadDetails, selectedTab]);

  return (
    <div className="chart-container">
      <Card className="min-w-xs" decoration="top" decorationColor="blue">
        <div>
          <Text>Total Revenue for {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</Text>
          <Metric>{`$${new Intl.NumberFormat("en-US").format(totalRevenue)}`}</Metric>
        </div>
        <TabGroup>
          <TabList className="mt-2 p-1">
            <Tab onClick={() => setSelectedTab("week")}>Week</Tab>
            <Tab onClick={() => setSelectedTab("month")}>Month</Tab>
            <Tab onClick={() => setSelectedTab("quarter")}>Quarter</Tab>
            <Tab onClick={() => setSelectedTab("year")}>Year</Tab>
          </TabList>
          {/* You might display specific data related to the selected time range here. */}
          <TabPanels>
            <TabPanel>
              {/* This section could be used for additional details or visualizations specific to the selected time range. */}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  );
};

export default TotalPricePerDriverChart;
