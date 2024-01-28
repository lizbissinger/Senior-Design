import React, { useEffect } from 'react';
import {
  Card,
  Grid,
  AreaChart,
  Title,
  DateRangePicker,
  SearchSelect,
  SearchSelectItem
} from "@tremor/react";
import { useState } from "react";
import{ UserIcon } from "@heroicons/react/24/solid";

const Reports: React.FC = () => {
  const [driver, setDriver] = useState("");
  const chartdata = [
    {
      date: "Jan 22",
      SemiAnalysis: 2890,
      "The Pragmatic Engineer": 2338,
    },
    {
      date: "Feb 22",
      SemiAnalysis: 2756,
      "The Pragmatic Engineer": 2103,
    },
    {
      date: "Mar 22",
      SemiAnalysis: 3322,
      "The Pragmatic Engineer": 2194,
    },
    {
      date: "Apr 22",
      SemiAnalysis: 3470,
      "The Pragmatic Engineer": 2108,
    },
    {
      date: "May 22",
      SemiAnalysis: 3475,
      "The Pragmatic Engineer": 1812,
    },
    {
      date: "Jun 22",
      SemiAnalysis: 3129,
      "The Pragmatic Engineer": 1726,
    },
  ];
  
  const valueFormatter = function (number:number) {
    return "$ " + new Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <div>
      <h2>Reports</h2>
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        <DateRangePicker className="max-w-sm mx-auto" enableSelect={false} />
        <div className="max-w-sm mx-auto space-y-6">
          <SearchSelect value={driver} onValueChange={setDriver} placeholder="Filter by driver" icon={UserIcon}>
            <SearchSelectItem value="Raj" icon={UserIcon}>
            Raj
            </SearchSelectItem>
            <SearchSelectItem value="Rash" icon={UserIcon}>
            Rash
            </SearchSelectItem>
            <SearchSelectItem value="Jazzy" icon={UserIcon}>
            Jazzy
            </SearchSelectItem>
            <SearchSelectItem value="Rishabh" icon={UserIcon}>
            Rishabh
            </SearchSelectItem>
          </SearchSelect>
        </div>
        <DateRangePicker className="max-w-sm mx-auto" enableSelect={false} />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="gap-6 mt-6">
        <Card>
            <Title>Newsletter revenue over time (USD)</Title>
            <AreaChart
              className="h-72 mt-4"
              data={chartdata}
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
              data={chartdata}
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
              data={chartdata}
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
              data={chartdata}
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