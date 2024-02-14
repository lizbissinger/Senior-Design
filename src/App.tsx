import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Overview from "./components/Overview/Overview";
import FleetManagement from "./components/FleetManagement/FleetManagement";
import LoadDetails from "./components/LoadDetails/LoadDetails";
import Reports from "./components/Reports/Reports";
import Finance from "./components/Finance/Finance";
import SignInPage from "./routes/sign-in";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import LandingPage from "./components/Common/LandingPage";
import AboutPage from "./components/Common/AboutPage";
import { Navigate } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App dark:bg-slate-900">
      <SignedOut>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </SignedOut>

      <SignedIn>
        <Router>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route index element={<Overview />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
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
