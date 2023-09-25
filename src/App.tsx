import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Overview from './components/Overview';
import TrucksManagement from './components/TrucksManagement';
import LoadDetails from './components/LoadDetails'; 

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/trucks" element={<TrucksManagement />} />
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
