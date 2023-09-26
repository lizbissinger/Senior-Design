import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Overview from './Overview';
import TrucksManagement from './TrucksManagement';
import UserInfo from './UserInfo'; 
import './Dashboard.css'; 

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="top-bar">
      <h1>FLEETWAVE</h1>
        <div className="tabs">
          <Link to="/dashboard/overview" className="tab">
            Overview
          </Link>
          <Link to="/dashboard/trucks" className="tab">
            Trucks Management
          </Link>
          {/* Add more tabs for other features */}
        </div>
        <UserInfo username="Jatt Singh" /> {/* Pass the user's name */}
      </div>
      <div className="content">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="trucks" element={<TrucksManagement />} />
          {/* Add more routes for other tabs */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
