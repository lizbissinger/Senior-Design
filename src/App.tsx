import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Overview from "./components/Overview/Overview";
import FleetManagement from "./components/FleetManagement/FleetManagement";
import LoadDetails from "./components/LoadDetails/LoadDetails";
import Reports from "./components/Reports/Reports";
import Finance from "./components/Finance/Finance";
import SignInPage from "./routes/sign-in";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const App: React.FC = () => {
  return (
    <div className="App">
      <SignedOut>
        <Router>
          <Routes>
            <Route path="/" element={<SignInPage />} />
          </Routes>
        </Router>
      </SignedOut>
      <SignedIn>
        <Router>
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route index element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/fleet" element={<FleetManagement />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Router>
      </SignedIn>
    </div>
  );
};

export default App;
