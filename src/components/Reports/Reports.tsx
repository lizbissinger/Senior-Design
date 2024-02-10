import React, { useEffect } from 'react';
import {
  Card, Grid, Col,
  AreaChart, BarChart, DonutChart,
  Title,
  DateRangePicker,
  SearchSelect, SearchSelectItem,
  Divider,
  Tab, TabGroup, TabList, TabPanel, TabPanels
} from "@tremor/react";
import { useState } from "react";
import{ UserIcon, PresentationChartLineIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import GetAllDrivers from "../../routes/driverDetails";
import GetAllRevenueReports from '../../routes/reports';
import { GetDriverRevenueReports } from '../../routes/reports';

const Reports: React.FC = () => {
  const [driver, setDriver] = useState("");
  const [drivers, setDrivers] = useState<string[]>([]);
  const [areaChartData, setAreaChartData] = useState([]);
  const [categories, setCategories] = useState<string[]>(["Cumulative"]);
  const [barChartToolTip, setBarChartToolTip] = useState(null);
  const [value, setValue] = useState(null);
  
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
      setBarChartToolTip(null);
    }
  }, [driver]);

  const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];

  return (
    <div>
      <h2 className="dark:text-neutral-200">Reports</h2>
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        <DateRangePicker className="max-w-sm"/>
        <div className="max-w-sm mx-auto space-y-6">
          <SearchSelect value={driver} onValueChange={setDriver} placeholder="Filter by driver" icon={UserIcon}>
            {drivers.map((d) => (
              <SearchSelectItem key={d} value={d} icon={UserIcon} />
            ))}
          </SearchSelect>
        </div>
        {/* <DateRangePicker className="max-w-sm" /> */}
      </Grid>
      <Divider>Charts</Divider>
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
        <Col numColSpan={1} numColSpanLg={2}>
          <Card>
            <Title>Revenue Over Time</Title>
            <TabGroup>
              <TabList>
                <Tab icon={PresentationChartLineIcon}></Tab>
                <Tab icon={ChartBarIcon}></Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <AreaChart
                    className="h-80 mt-4"
                    data={areaChartData}
                    index="date"
                    yAxisWidth={65}
                    categories={categories}
                    colors={["indigo-400"]}
                    valueFormatter={valueFormatter}
                    showAnimation={true}
                    animationDuration={1500}
                    curveType="monotone"
                  />
                </TabPanel>
                <TabPanel>
                  <BarChart
                    className="h-80 mt-4"
                    data={areaChartData}
                    index="date"
                    yAxisWidth={65}
                    categories={categories}
                    colors={["indigo-400"]}
                    valueFormatter={valueFormatter}
                    showAnimation={true}
                    animationDuration={1500}
                    onValueChange={(v:any) => setBarChartToolTip(v)}
                  />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Card>
        </Col>
        <Card>
          <Title>Expenses</Title>
          {/* <Divider></Divider> */}
          <DonutChart
            data={cities}
            category="sales"
            index="name"
            onValueChange={(v) => setValue(v)}
            variant="pie"
          />
        </Card>
        <Card>
          <Title>Expenses</Title>
          {/* <Divider></Divider> */}
          <DonutChart
            data={cities}
            category="sales"
            index="name"
            onValueChange={(v) => setValue(v)}
          />
        </Card>
        <Card>
          <Title>Expenses</Title>
          {/* <Divider></Divider> */}
          <DonutChart
            data={cities}
            category="sales"
            index="name"
            onValueChange={(v) => setValue(v)}
          />
        </Card>
        <Card>
          <Title>Expenses</Title>
          {/* <Divider></Divider> */}
          <DonutChart
            data={cities}
            category="sales"
            index="name"
            onValueChange={(v) => setValue(v)}
          />
        </Card>
      </Grid>
    </div>
  );
};

export default Reports;