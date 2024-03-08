import React from "react";
import { RiBarChartFill, RiAddFill } from "@remixicon/react";
import { Link } from "react-router-dom";

const NoDataToShow: React.FC = () => {
  return (
    <div>
      <div className="mt-4 flex h-96 items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background-muted p-4 dark:border-dark-tremor-border dark:bg-slate-900">
        <div className="text-center">
          <RiBarChartFill
            className="mx-auto h-7 w-7 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
            aria-hidden={true}
          />
          <p className="mt-2 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            No data to show
          </p>
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Please make sure there is data available to load
          </p>
          <Link to="/dashboard/overview">
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-1.5 whitespace-nowrap rounded-tremor-small bg-[#779BFB] px-3 py-2 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-[#6686DC] dark:bg-[#6686DC] dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-[#779BFB]"
            >
              <RiAddFill
                className="-ml-1 h-5 w-5 shrink-0"
                aria-hidden={true}
              />
              Add loads
            </button>
          </Link>
        </div>
      </div>
      <div className="h-2"></div>
    </div>
  );
};

export default NoDataToShow;
