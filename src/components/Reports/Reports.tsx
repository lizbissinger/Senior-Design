import React, { useEffect } from 'react';
import {
  Card,
  Grid,
  AreaChart,
  Title,
  DateRangePicker,
  SearchSelect,
  SearchSelectItem,
  Divider
} from "@tremor/react";
import { useState } from "react";
import{ UserIcon } from "@heroicons/react/24/solid";
import GetAllDrivers from "../../routes/driverDetails";
import GetAllRevenueReports from '../../routes/reports';
import { GetDriverRevenueReports } from '../../routes/reports';

const Reports: React.FC = () => {
  const [driver, setDriver] = useState("");
  const [drivers, setDrivers] = useState<string[]>([]);
  const [areaChartData, setAreaChartData] = useState([]);
  const [categories, setCategories] = useState<string[]>(["Cumulative"]);
  
  const valueFormatter = function (number:number) {
    return "$ " + new Intl.NumberFormat("us").format(number).toString();
  };

  const fetchAllDrivers = async () => {
    try {
      const driverList = await GetAllDrivers();

      if (driverList) {
        const driverNames = driverList.map((driver) => driver.name);
        setDrivers(driverNames);
      }
    } catch (error) {}
  };

  const fetchAllRevenueData = async () => {
    try {
      const allRevenueData = await GetAllRevenueReports();

      if (allRevenueData) {
        setAreaChartData(allRevenueData);
        setCategories(["Cumulative"]);
      }
    } catch (error) {}
  };

  const fetchDriverRevenueData = async () => {
    try {
      const driverRevenueData = await GetDriverRevenueReports(driver);

      if (driverRevenueData) {
        console.log(driverRevenueData);
        setAreaChartData(driverRevenueData);
        setCategories([driver]);
      }
    } catch (error) {}
  };

  // handle driver filter change
  useEffect(() => {
    if (driver.length > 0) {
      fetchDriverRevenueData();
    } else {
      fetchAllDrivers();
      fetchAllRevenueData();
    }
  }, [driver]);

  return (
    <div>
      <h2>Reports</h2>
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        <DateRangePicker className="max-w-sm mx-auto" enableSelect={false} />
        <div className="max-w-sm mx-auto space-y-6">
          <SearchSelect value={driver} onValueChange={setDriver} placeholder="Filter by driver" icon={UserIcon}>
            {drivers.map((d) => (
              <SearchSelectItem key={d} value={d} icon={UserIcon} />
            ))}
          </SearchSelect>
        </div>
        <DateRangePicker className="max-w-sm mx-auto" enableSelect={false} />
      </Grid>
      <Divider>Charts</Divider>
      <Grid numItemsMd={2} numItemsLg={2} className="gap-6 mt-6">
        <Card>
            <Title>Revenue Over Time</Title>
            <AreaChart
              className="h-72 mt-4"
              data={areaChartData}
              index="date"
              yAxisWidth={65}
              categories={categories}
              colors={["indigo"]}
              valueFormatter={valueFormatter}
              showAnimation={true}
              animationDuration={1500}
              curveType="monotone"
            />
          </Card>
          <Card>
            <Title>Newsletter revenue over time (USD)</Title>
            <AreaChart
              className="h-72 mt-4"
              data={areaChartData}
              index="date"
              yAxisWidth={65}
              categories={["SemiAnalysis", "The Pragmatic Engineer"]}
              colors={["indigo", "cyan"]}
              valueFormatter={valueFormatter}
            />
          </Card>
          <Card>
            <Title>Newsletter revenue over time (USD)</Title>
            <AreaChart
              className="h-72 mt-4"
              data={areaChartData}
              index="date"
              yAxisWidth={65}
              categories={["SemiAnalysis", "The Pragmatic Engineer"]}
              colors={["indigo", "cyan"]}
              valueFormatter={valueFormatter}
            />
          </Card>
          <Card>
            <Title>Newsletter revenue over time (USD)</Title>
            <AreaChart
              className="h-72 mt-4"
              data={areaChartData}
              index="date"
              yAxisWidth={65}
              categories={["SemiAnalysis", "The Pragmatic Engineer"]}
              colors={["indigo", "cyan"]}
              valueFormatter={valueFormatter}
            />
          </Card>
      </Grid>
    </div>
  );
};

export default Reports;