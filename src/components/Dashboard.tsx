import React, { useState, useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Overview from "./Overview/Overview";
import FleetManagement from "./FleetManagement/FleetManagement";
import "./Dashboard.css";
import Reports from "./Reports/Reports";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Finance from "./Finance/Finance";
import { UserButton } from "@clerk/clerk-react";
import DarkModeSwitcher from "./DarkModeSwitcher";

const Dashboard: React.FC = () => {
  const logoText = "FLEETWAVE";

  useEffect(() => {
    localStorage.setItem("logoText", logoText);
  }, []);

  const [activeTab, setActiveTab] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentTab = pathSegments[pathSegments.length - 1];
    setActiveTab(currentTab || "overview");
  }, [location.pathname]);

  const navigation = [
    {
      name: "Overview",
      href: "/dashboard/overview",
      current: activeTab === "overview",
    },
    {
      name: "Fleet Management",
      href: "/dashboard/fleet",
      current: activeTab === "fleet",
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      current: activeTab === "reports",
    },
    {
      name: "Finance",
      href: "/dashboard/finance",
      current: activeTab === "finance",
    },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (item: any) => {
    setActiveTab(item.href.split("/").pop() || "");
    navigate(item.href);

    setIsMobileMenuOpen(false);
  };

  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="min-h-screen">
      <div className="bg-slate-200 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50 border-b border-gray-200 sticky top-0 z-50 dark:bg-slate-950 dark:border-black dark:bg-opacity-50">
        <div className="max-w-200xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-950 hover:bg-[#779BFB] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:bg-[#6686DC] dark:text-white"
                onClick={handleMobileMenuToggle}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
              <DarkModeSwitcher />
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="h-8 w-auto select-none logo-text">
                  <Link
                    to="/dashboard/overview"
                    className="no-underline text-neutral-900 hover:text-neutral-900 hover:no-underline dark:text-white"
                    onClick={() => {
                      setActiveTab("overview");
                    }}
                  >
                    <span>{logoText}</span>
                  </Link>
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:block mt-1">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => handleLinkClick(item)}
                      className={classNames(
                        item.current
                          ? "text-[#6686DC] hover:text-[#6686DC]"
                          : "text-neutral-950 hover:text-[#6686DC] dark:text-white dark:hover:text-[#6686DC]",
                        "rounded-md px-3 py-2 text-50 font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <DarkModeSwitcher />
            <div className="ml-2 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full p-1 text-neutral-800 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#6686DC] focus:ring-offset-0.5 focus:text-neutral-800 dark:text-neutral-300 dark:hover:text-white dark:focus:text-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <Menu as="div" className="relative ml-3">
                <div>
                  <UserButton afterSignOutUrl="/" />
                </div>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "no-underline block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "no-underline block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "no-underline block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "sm:hidden" : "hidden"
          } transition-transform ease-in-out duration-300`}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleLinkClick(item)}
                className={classNames(
                  item.current
                    ? "bg-[#779BFB] text-neutral-950 no-underline dark:bg-[#6686DC]"
                    : "no-underline text-neutral-950 hover:bg-[#779BFB] hover:no-underline hover:text-neutral-950 dark:text-white dark:hover:bg-[#6686DC] dark:hover:text-neutral-950",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="fleet" element={<FleetManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="finance" element={<Finance />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
