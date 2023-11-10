import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const DataVisualization = () => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']; // X-axis labels
    const loadCounts = [10, 20, 30, 25, 40, 35]; // Example total load counts
    const revenueData = [5000, 7500, 9000, 6500, 11000, 9500]; // Example revenue over time
  
    const chartOptions = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Value',
            },
          },
        },
      };
    // Chart.js data structure
    const loadCountsData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis labels
      datasets: [
        {
          label: 'Total Loads',
          data: loadCounts,
          fill: false, // No fill below the line
          borderColor: 'blue', // Line color
        },
      ],
    };
  
    const revenueDataOptions = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis labels
      datasets: [
        {
          label: 'Revenue',
          data: revenueData,
          fill: false, // No fill below the line
          borderColor: 'green', // Line color
        },
      ],
    };
  
    return (
        <div className="data-visualizations">
        <div className="visualization">
          <h3>Total Number of Loads Over Time</h3>
          <Line data={loadCountsData} options={chartOptions} />
        </div>
        <div className="visualization">
          <h3>Revenue Over Time</h3>
          <Line data={revenueDataOptions} options={chartOptions} />
        </div>
        {/* Add the third visualization here */}
      </div>
    );
  };
  
  export default DataVisualization;