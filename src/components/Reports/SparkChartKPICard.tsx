import React, { useState, useEffect } from "react";
import { Card, AreaChart } from "@tremor/react";
import { PresentationChartLineIcon } from "@heroicons/react/24/solid";

interface SparkChartKPICardProps {
  kpiCardData: {
    name: string;
    value: string;
    change: string;
    changeType: string;
  };
  chartData: any;
  categories: any;
}

const SparkChartKPICard: React.FC<SparkChartKPICardProps> = ({
  kpiCardData,
  chartData,
  categories,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Card className="p-1.5 bg-gray-50 rounded-xl shadow-xl min-h-52 dark:shadow-slate-950 dark:shadow-xl">
      <Card className="rounded-md min-h-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-40 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <PresentationChartLineIcon
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            <p className="flex items-start justify-between">
              <span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {kpiCardData.value}
              </span>
              <span
                className={classNames(
                  kpiCardData.changeType === "positive"
                    ? "bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20"
                    : "bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20",
                  "inline-flex items-center rounded-tremor-small px-2 py-1 text-tremor-label font-medium ring-1 ring-inset"
                )}
              >
                {kpiCardData.change}
              </span>
            </p>
            <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {kpiCardData.name}
            </p>
            <AreaChart
              className="max-h-14"
              data={chartData}
              index="date"
              categories={categories}
              colors={
                kpiCardData.changeType === "positive" ? ["emerald"] : ["red"]
              }
              showAnimation={true}
              showGridLines={false}
              showXAxis={false}
              showYAxis={false}
              showLegend={false}
              animationDuration={1500}
            />
          </>
        )}
      </Card>
    </Card>
  );
};

export default SparkChartKPICard;
