import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './Dashboard.css'; 
import UserInfo from '../UserInfo/UserInfo';
import Overview from '../Overview/Overview';
import FleetManagement from '../FleetManagement/FleetManagement';

const Reports: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="top-bar">
      <h1>FLEETWAVE</h1>
        <div className="tabs">
          <Link to="/dashboard/overview" className="tab">
            Overview
          </Link>
          <Link to="/dashboard/fleet" className="tab">
            Fleet Management
          </Link>
          <Link to="/dashboard/reports" className="tab">
            Reports
          </Link>
          <Link to="/dashboard/finance" className="tab">
            Finance
          </Link>
          
          {/* Add more tabs for other features */}
        </div>
        <UserInfo username="Jatt Singh" /> {/* Pass the user's name */}
      </div>
      <div className="content">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="fleet" element={<FleetManagement />} />
          <Route path="reports" element={<Reports/>} />
          <Route path="finance" /* add element here */ />
          {/* Add more routes for other tabs */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;