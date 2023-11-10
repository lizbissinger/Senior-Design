import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import UserInfo from '../UserInfo/UserInfo';
import Overview from '../Overview/Overview';
import FleetManagement from '../FleetManagement/FleetManagement';
import DataVisualization from './DataVisualization';

const Reports: React.FC = () => {
  return (
    <DataVisualization />
    
  );
};

export default Reports;