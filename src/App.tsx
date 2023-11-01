import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Overview from "./components/Overview/Overview";
import FleetManagement from "./components/FleetManagement/FleetManagement";
import LoadDetails from "./components/LoadDetails/LoadDetails";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/fleet" element={<FleetManagement />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
