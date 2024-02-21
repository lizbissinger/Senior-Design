import React, { useEffect } from 'react';
import "./Reports.css";
import {
  Card, Grid, Col,
  AreaChart, BarChart, DonutChart,
  Title,
  DateRangePicker, DateRangePickerValue,
  SearchSelect, SearchSelectItem,
  Tab, TabGroup, TabList, TabPanel, TabPanels,
  List, ListItem
} from "@tremor/react";
import { useState } from "react";
import{ UserIcon, PresentationChartLineIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import NoDataToShow from "./NoDataToShow";
import SparkChartKPICard from "./SparkChartKPICard";
import GetAllDrivers from "../../routes/driverDetails";
import GetAllRevenueData from '../../routes/reports';
import { GetRevenuePerMileData, GetNumberOfMiles, GetLoadCount } from "../../routes/reports";

const Reports: React.FC = () => {
  const [driver, setDriver] = useState("");
  const [drivers, setDrivers] = useState<string[]>([]);
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30)
  const [date, setDate] = useState<DateRangePickerValue>({
    to: new Date(),
    from: fromDate
  });
  const [revenueOverTimeChartData, setRevenueOverTimeChartData] = useState([]);
  const [revenuePerMileChartData, setRevenuePerMileChartData] = useState<Object[]>([]);
  const [revenuePerMileKpiCardData, setRevenuePerMileKpiCardData] = useState<any>({});
  const [totalMilesChartData, setTotalMilesChartData] = useState<Object[]>([]);
  const [totalMilesKpiCardData, setTotalMilesKpiCardData] = useState<any>({});
  const [totalLoadsChartData, setTotalLoadsChartData] = useState<Object[]>([]);
  const [totalLoadsKpiCardData, setTotalLoadsKpiCardData] = useState<any>({});
  const [categories, setCategories] = useState<string[]>(["Cumulative"]);
  const [barChartToolTip, setBarChartToolTip] = useState(null);
  
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

  const fetchRevenueOverTimeChartData = async () => {
    try {
      const driverRevenueData = await GetAllRevenueData(driver, date);

      if (driverRevenueData) {
        setRevenueOverTimeChartData(driverRevenueData);
        if (driver.length > 0) {
          setCategories([driver]);
        } else {
          setCategories(["Cumulative"]);
        }
      }
    } catch (error) {}
  };

  const fetchRevenuePerMileChartData = async () => {
    try {
      const driverRevenuePerMileData = await GetRevenuePerMileData(driver, date);

      if (driverRevenuePerMileData) {
        setRevenuePerMileChartData(driverRevenuePerMileData);

        const first_value = driverRevenuePerMileData[0].revenuePerMile;
        const last_value = driverRevenuePerMileData[driverRevenuePerMileData.length-1].revenuePerMile;
        const _change = Math.round(((last_value - first_value) / last_value) * 100);
        const change = _change > 0 ? `+${_change}%` : `${_change}%`;
        const changeType = _change > 0 ? "positive" : "negative";
        let revenue = 0;
        let miles = 0;
        driverRevenuePerMileData.map((r:any) => {
          revenue = revenue + r.revenue;
          miles = miles + r.miles;
        });

        const kpiCardData = {
          name: 'Revenue per mile',
          value: valueFormatter(Math.round(((revenue / miles) + Number.EPSILON) * 100) / 100),
          change: change,
          changeType: changeType,
        };
        setRevenuePerMileKpiCardData(kpiCardData);
      }
    } catch (error) {}
  };

  const fetchNumberOfMilesChartData = async () => {
    try {
      const driverNumberOfMilesData = await GetNumberOfMiles(driver, date);

      if (driverNumberOfMilesData) {
        setTotalMilesChartData(driverNumberOfMilesData);

        const first_value = driverNumberOfMilesData[0].miles;
        const last_value = driverNumberOfMilesData[driverNumberOfMilesData.length-1].miles;
        const _change = Math.round(((last_value - first_value) / last_value) * 100);
        const change = _change > 0 ? `+${_change}%` : `${_change}%`;
        const changeType = _change > 0 ? "positive" : "negative";
        let value = 0;
        driverNumberOfMilesData.map((r:any) => {
          value = value + r.miles;
        });

        const kpiCardData = {
          name: 'Total miles',
          value: Math.round(value * 10) / 10,
          change: change,
          changeType: changeType,
        };
        setTotalMilesKpiCardData(kpiCardData);
      }
    } catch (error) {}
  };

  const fetchLoadCountChartData = async () => {
    try {
      const loadCountData = await GetLoadCount(driver, date);

      if (loadCountData) {
        setTotalLoadsChartData(loadCountData);

        const first_value = loadCountData[0].loadCount;
        const last_value = loadCountData[loadCountData.length-1].loadCount;
        const _change = Math.round(((last_value - first_value) / last_value) * 100);
        const change = _change > 0 ? `+${_change}%` : `${_change}%`;
        const changeType = _change > 0 ? "positive" : "negative";
        let value = 0;
        loadCountData.map((r:any) => {
          value = value + r.loadCount;
        });

        const kpiCardData = {
          name: 'Total loads',
          value: value,
          change: change,
          changeType: changeType,
        };
        setTotalLoadsKpiCardData(kpiCardData);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllDrivers();
    fetchRevenueOverTimeChartData();
    fetchRevenuePerMileChartData();
    fetchNumberOfMilesChartData();
    fetchLoadCountChartData();
  }, [driver, date]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  };

  const data = [
    {
      name: 'Travel',
      amount: 6730,
      share: '32.1%',
      color: 'bg-cyan-500',
    },
    {
      name: 'IT & equipment',
      amount: 4120,
      share: '19.6%',
      color: 'bg-blue-500',
    },
    {
      name: 'Training & development',
      amount: 3920,
      share: '18.6%',
      color: 'bg-indigo-500',
    },
    {
      name: 'Office supplies',
      amount: 3210,
      share: '15.3%',
      color: 'bg-violet-500',
    },
    {
      name: 'Communication',
      amount: 3010,
      share: '14.3%',
      color: 'bg-fuchsia-500',
    },
  ];

  return (
    <div>
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        <DateRangePicker className="DateRangePicker min-w-sm" value={date} onValueChange={setDate}/>
        <div className="max-w-sm mx-auto space-y-6">
          <SearchSelect value={driver} onValueChange={setDriver} placeholder="Filter by driver" icon={UserIcon}>
            {drivers.map((d) => (
              <SearchSelectItem className="cursor-pointer" key={d} value={d} icon={UserIcon} />
            ))}
          </SearchSelect>
        </div>
      </Grid>
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
        <Col numColSpan={1} numColSpanLg={2}>
          <Card className="p-1.5 bg-gray-50 rounded-xl shadow-xl min-h-full">
            <Card className="rounded-md min-h-full">
              <Title>Revenue Over Time</Title>
              <TabGroup>
                <TabList>
                  <Tab icon={PresentationChartLineIcon}></Tab>
                  <Tab icon={ChartBarIcon}></Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    { revenueOverTimeChartData.length > 0 ? 
                      <div>
                        <AreaChart
                          className="h-96 mt-4"
                          data={revenueOverTimeChartData}
                          index="date"
                          yAxisWidth={65}
                          categories={categories}
                          colors={["indigo-400"]}
                          valueFormatter={valueFormatter}
                          showAnimation={true}
                          animationDuration={1500}
                          curveType="monotone"
                        />
                        <div className="h-2"></div>
                      </div>
                      :
                      <NoDataToShow />
                    }
                  </TabPanel>
                  <TabPanel>
                    { revenueOverTimeChartData.length > 0 ? 
                      <div>
                        <BarChart
                          className="h-96 mt-4"
                          data={revenueOverTimeChartData}
                          index="date"
                          yAxisWidth={65}
                          categories={categories}
                          colors={["indigo-400"]}
                          valueFormatter={valueFormatter}
                          showAnimation={true}
                          animationDuration={1500}
                          onValueChange={(v:any) => setBarChartToolTip(v)}
                        />
                        <div className="h-2"></div>
                      </div>
                      :
                      <NoDataToShow />
                    }
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </Card>
          </Card>
        </Col>
        <Card className="p-1.5 bg-gray-50 rounded-xl shadow-xl">
          <Card className="rounded-md min-h-full">
            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Total expenses by category
            </h3>
            <DonutChart
              className="mt-8"
              data={data}
              category="amount"
              index="name"
              valueFormatter={valueFormatter}
              showTooltip={false}
              colors={['cyan', 'blue', 'indigo', 'violet', 'fuchsia']}
            />
            <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
              <span>Category</span>
              <span>Amount / Share</span>
            </p>
            <List className="mt-2">
              {data.map((item) => (
                <ListItem key={item.name} className="space-x-6">
                  <div className="flex items-center space-x-2.5 truncate">
                    <span
                      className={classNames(
                        item.color,
                        'w-1 h-4 shrink-0 rounded',
                      )}
                      aria-hidden={true}
                    />
                    <span className="truncate dark:text-dark-tremor-content-emphasis">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      {valueFormatter(item.amount)}
                    </span>
                    <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                      {item.share}
                    </span>
                  </div>
                </ListItem>
              ))}
            </List>
          </Card>
        </Card>
        <SparkChartKPICard kpiCardData={revenuePerMileKpiCardData} chartData={revenuePerMileChartData} categories={["revenuePerMile"]} />
        <SparkChartKPICard kpiCardData={totalMilesKpiCardData} chartData={totalMilesChartData} categories={["miles"]} />
        <SparkChartKPICard kpiCardData={totalLoadsKpiCardData} chartData={totalLoadsChartData} categories={["loadCount"]} />
      </Grid>
    </div>
  );
};

export default Reports;