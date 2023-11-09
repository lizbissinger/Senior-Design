import React from 'react';
//import * as faker from 'faker';
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

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
    <Line options={options} data={data} />
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