// import React from 'react';
import './DataVisualization.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

import { faker } from '@faker-js/faker';


export const data = {
  labels,
  datasets: [
    {
      label: 'Data Set 1',
      data: [faker.datatype.number(), faker.datatype.number(), faker.datatype.number(), faker.datatype.number(), faker.datatype.number(), faker.datatype.number(), faker.datatype.number()],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Data Set 2',
      data: [faker.datatype.number(), faker.datatype.number(), faker.datatype.number(), faker.datatype.number(), faker.datatype.number(), faker.datatype.number(), faker.datatype.number()],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
    },
  ],
};
const DashboardReports = () => {
  const loadCountsData = {
    labels: [], // Provide your date labels
    datasets: [
      {
        label: 'Load Counts',
        data: [], // Provide your load count data
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const loadCountsOptions = {
    scales: {
      x: {
        type: 'time', // Assuming x-axis represents time
        time: {
          unit: 'day', // Adjust the time unit as needed
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const revenueData = {
    labels: [], // Provide your date labels
    datasets: [
      {
        label: 'Revenue',
        data: [], // Provide your revenue data
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  const revenueOptions = {
    scales: {
      x: {
        type: 'time', // Assuming x-axis represents time
        time: {
          unit: 'day', // Adjust the time unit as needed
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="status-boxes">
    <div className="status-box first">
        <div className="status-title">Loads Over Time</div>
        <div className="status-number">{<Line options={options} data={data} />}</div>
    
      </div>
      <div className="status-box second">
        <div className="status-title">Completion Times</div>
        <div className="status-number">{<Line options={options} data={data} />}</div>
     
      </div>
      <div className="status-box third">
        <div className="status-title">Growth</div>
        <div className="status-number">{<Line options={options} data={data} />}</div>
     
      </div>
    </div>
    // <div className="graphs-container">
    //   <div className="line-chart">
    // <Line options={options} data={data} />
    // </div>
    // </div>
  );
};

export default DashboardReports;


//  <div className="dashboard-reports">
{/* <div className="visualizations">
<div className="visualization">
return <Line options={options} data={data} />;
  <h3>Load Counts Over Time</h3>
  <Line data={loadCountsData} options={loadCountsOptions} id="loadCountsChart" />
</div>
<div className="visualization">
  <h3>Revenue Over Time</h3>
  <Line data={revenueData} options={revenueOptions} id="revenueChart" />
</div>
{/* Add another chart here if needed */}
//</div>
//<div className="reports">
//Add report sections here
//</div>
//</div> */}