import React, { useEffect, useState } from "react";
import {
  Card,
  Metric,
  Text,
  Tab,
  TabGroup,
  TabList,
} from "@tremor/react";
import { LoadDetail } from "../Types/types";

interface TotalPricePerDriverChartProps {
  loadDetails: LoadDetail[];
}

const TotalPricePerDriverChart: React.FC<TotalPricePerDriverChartProps> = ({
  loadDetails,
}) => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>("week");

  const filterLoadDetailsByTimeRange = (range: string) => {
    const currentDate = new Date();
    return loadDetails.filter((load) => {
      const deliveryTime = new Date(load.deliveryTime);
      switch (range) {
        case "week":
          const weekStart = new Date(
            currentDate.setDate(
              currentDate.getDate() -
                currentDate.getDay() +
                (currentDate.getDay() === 0 ? -6 : 1)
            )
          );
          return deliveryTime >= weekStart;
        case "month":
          const monthStart = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          return deliveryTime >= monthStart;
        case "quarter":
          const quarterStart = new Date(
            currentDate.getFullYear(),
            Math.floor(currentDate.getMonth() / 3) * 3,
            1
          );
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
      const total = filteredLoadDetails.reduce(
        (acc, load) => acc + (parseFloat(load.price) || 0),
        0
      );
      setTotalRevenue(total);
    };

    calculateAndSetRevenue();
  }, [loadDetails, selectedTab]);

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
            <Tab onClick={() => setSelectedTab("week")} className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]">Week</Tab>
            <Tab onClick={() => setSelectedTab("month")} className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]">Month</Tab>
            <Tab onClick={() => setSelectedTab("quarter")} className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]">Quarter</Tab>
            <Tab onClick={() => setSelectedTab("year")} className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]">Year</Tab>
          </TabList>
        </TabGroup>
      </Card>
    </div>
  );
};

export default TotalPricePerDriverChart;
