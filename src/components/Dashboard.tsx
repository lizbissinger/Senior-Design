import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Overview from "./Overview/Overview";
import FleetManagement from "./FleetManagement/FleetManagement";
import UserInfo from "./UserInfo/UserInfo";
import "./Dashboard.css";
import Reports from "./Reports/Reports";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Finance from "./Finance/Finance";
import { UserButton } from "@clerk/clerk-react";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate = useNavigate();

  const navigation = [
    {
      name: "Overview",
      href: "/dashboard/overview",
      current: activeTab === "Overview",
    },
    {
      name: "Fleet Management",
      href: "/dashboard/fleet",
      current: activeTab === "Fleet Management",
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      current: activeTab === "Reports",
    },
    {
      name: "Finance",
      href: "/dashboard/finance",
      current: activeTab === "Finance",
    },
  ];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <Disclosure as="nav" className="bg-[#7392e9] sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="max-w-200xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-950 hover:bg-[#6686DC] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <h1 className="h-8 w-auto select-none ml-1 mb-3">
                      <Link
                        to="/dashboard/overview"
                        className="no-underline text-neutral-900 hover:text-neutral-900 hover:no-underline"
                      >
                        FLEETWAVE
                      </Link>
                    </h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:block mt-1">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => {
                            setActiveTab(item.name);
                            navigate(item.href);
                          }}
                          className={classNames(
                            item.current
                              ? "bg-[#6686DC] text-neutral-950 no-underline"
                              : "no-underline text-neutral-950 hover:bg-[#6686DC] hover:text-neutral-950 hover:no-underline",
                            "rounded-md px-3 py-2 text-50 font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-[#7392e9] p-1 text-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-900"
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

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => {
                      setActiveTab(item.name);
                      navigate(item.href);
                    }}
                    className={classNames(
                      item.current
                        ? "bg-[#6686DC] text-neutral-950 no-underline"
                        : "no-underline text-neutral-950 hover:bg-[#6686DC] hover:no-underline hover:text-neutral-950",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
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
