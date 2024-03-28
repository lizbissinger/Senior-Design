import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Overview from "./components/Overview/Overview";
import FleetManagement from "./components/FleetManagement/FleetManagement";
import Reports from "./components/Reports/Reports";
import SignInPage from "./routes/sign-in";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import LandingPage from "./components/LandingPage/LandingPage";
import AboutPage from "./components/LandingPage/AboutPage";
import { Navigate } from "react-router-dom";
import PosterPage from "./components/LandingPage/PosterPage";

const App: React.FC = () => {
  return (
    <div className="App dark:bg-slate-900 custom-scrollbar">
      <SignedOut>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/poster" element={<PosterPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </SignedOut>

      <SignedIn>
        <Router>
          <Routes>
            <Route path="*" element={<Navigate to="/dashboard/overview"/>} />
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
