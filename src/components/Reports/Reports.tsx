import React, { useEffect } from 'react';
import "./Reports.css";
import {
  Card, Grid, Col,
  AreaChart, BarChart, DonutChart, SparkAreaChart,
  Title,
  DateRangePicker, DateRangePickerValue,
  SearchSelect, SearchSelectItem,
  Divider,
  Tab, TabGroup, TabList, TabPanel, TabPanels,
  List, ListItem
} from "@tremor/react";
import { useState } from "react";
import{ UserIcon, PresentationChartLineIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import NoDataToShow from "./NoDataToShow";
import GetAllDrivers from "../../routes/driverDetails";
import GetAllRevenueData from '../../routes/reports';
import GetAllLoads from "../../routes/loadDetails";

const Reports: React.FC = () => {
  const [driver, setDriver] = useState("");
  const [drivers, setDrivers] = useState<string[]>([]);
  const [allLoads, setAllLoads] = useState(null);
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30)
  const [date, setDate] = useState<DateRangePickerValue>({
    to: new Date(),
    from: fromDate
  });
  const [revenueOverTimeChartData, setRevenueOverTimeChartData] = useState([]);
  const [categories, setCategories] = useState<string[]>(["Cumulative"]);
  const [barChartToolTip, setBarChartToolTip] = useState(null);
  
  const valueFormatter = function (number:number) {
    return "$ " + new Intl.NumberFormat("us").format(number).toString();
  };
  const currencyFormatter = (number:number) => {
    return '$' + Intl.NumberFormat('us').format(number).toString();
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

  const fetchAllLoads = async () => {
    try {
      const loads = await GetAllLoads();

      if (loads) {
        setAllLoads(loads);
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

  useEffect(() => {
    fetchAllLoads();
  }, []);

  useEffect(() => {
    fetchAllDrivers();
    fetchRevenueOverTimeChartData();
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

  const kpiCardData1 = {
    name: 'Recurring revenue',
    value: '$34.1K',
    change: '+6.1%',
    changeType: 'positive',
  };  
  const kpiCardData2 = {
    name: 'Total users',
    value: '500.1K',
    change: '+19.2%',
    changeType: 'positive',
  };  
  const kpiCardData3 = {
    name: 'User growth',
    value: '11.3%',
    change: '-1.2%',
    changeType: 'negative',
  };  

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
              valueFormatter={currencyFormatter}
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
                      {currencyFormatter(item.amount)}
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
        <Card className="p-1.5 bg-gray-50 rounded-xl shadow-xl min-h-52">
          <Card className="rounded-md min-h-full">
            <p className="flex items-start justify-between">
              <span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {kpiCardData1.value}
              </span>
              <span
                className={classNames(
                  kpiCardData1.changeType === 'positive'
                    ? 'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20'
                    : 'bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20',
                  'inline-flex items-center rounded-tremor-small px-2 py-1 text-tremor-label font-medium ring-1 ring-inset'
                )}
              >
                {kpiCardData1.change}
              </span>
            </p>
            <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {kpiCardData1.name}
            </p>
            <SparkAreaChart
              className="min-w-full"
              data={revenueOverTimeChartData}
              index="date"
              categories={categories}
              colors={kpiCardData1.changeType === 'positive' ? ['emerald'] : ['red']}
            />
          </Card>
        </Card>
        <Card className="p-1.5 bg-gray-50 rounded-xl shadow-xl min-h-52">
          <Card className="rounded-md min-h-full">
            <p className="flex items-start justify-between">
              <span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {kpiCardData2.value}
              </span>
              <span
                className={classNames(
                  kpiCardData1.changeType === 'positive'
                    ? 'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20'
                    : 'bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20',
                  'inline-flex items-center rounded-tremor-small px-2 py-1 text-tremor-label font-medium ring-1 ring-inset'
                )}
              >
                {kpiCardData2.change}
              </span>
            </p>
            <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {kpiCardData2.name}
            </p>
            <SparkAreaChart
              className="min-w-full"
              data={revenueOverTimeChartData}
              index="date"
              categories={categories}
              colors={kpiCardData2.changeType === 'positive' ? ['emerald'] : ['red']}
            />
          </Card>
        </Card>
        <Card className="p-1.5 bg-gray-50 rounded-xl shadow-xl min-h-52">
          <Card className="rounded-md min-h-full">
            <p className="flex items-start justify-between">
              <span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {kpiCardData3.value}
              </span>
              <span
                className={classNames(
                  kpiCardData3.changeType === 'positive'
                    ? 'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20'
                    : 'bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20',
                  'inline-flex items-center rounded-tremor-small px-2 py-1 text-tremor-label font-medium ring-1 ring-inset'
                )}
              >
                {kpiCardData3.change}
              </span>
            </p>
            <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {kpiCardData3.name}
            </p>
            <SparkAreaChart
              className="min-w-full"
              data={revenueOverTimeChartData}
              index="date"
              categories={categories}
              colors={kpiCardData3.changeType === 'positive' ? ['emerald'] : ['red']}
            />
          </Card>
        </Card>
      </Grid>
    </div>
  );
};

export default Reports;