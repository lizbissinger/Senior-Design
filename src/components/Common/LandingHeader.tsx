import { SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Disclosure as="nav" className="sticky relative top-0 z-50">
        {({ open }) => (
          <>
            <div className="max-w-full px-2 sm:px-6 lg:px-8">
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
                    <h1 className="h-8 w-auto select-none lg:ml-1 lg:mb-3">
                      <Link to="/" className={`header-logo block w-full`}>
                        <h1 className="font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text md:leading-tight">
                          FLEETWAVE
                        </h1>
                      </Link>
                    </h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:block mt-1">
                    <div className="flex space-x-4">
                      {menuData.map((menuItem) => (
                        <button
                          key={menuItem.id}
                          onClick={() => navigate(menuItem.path || "")}
                          className={`${
                            menuItem.path === window.location.pathname
                              ? "bg-[#6686DC] text-neutral-950"
                              : "text-neutral-950 hover:bg-[#6686DC] hover:text-neutral-950 hover:no-underline"
                          } rounded-md px-3 py-2 text-50 font-medium focus:outline-none`}
                        >
                          {menuItem.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <Disclosure.Button className="text-sm ">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Link
                      to="/login"
                      className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                    >
                      Sign In
                    </Link>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Link
                      to="/login"
                      className="ease-in-up shadow-btn hover:shadow-btn-hover rounded-sm bg-primary px-4 py-2 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:hidden"
                    >
                      Sign In
                    </Link>
                  </div>
                </Disclosure.Button>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {menuData.map((menuItem) => (
                  <button
                    key={menuItem.id}
                    onClick={() => navigate(menuItem.path || "")}
                    className={`${
                      menuItem.path === window.location.pathname
                        ? "bg-[#6686DC] text-neutral-950 no-underline"
                        : "no-underline text-neutral-950 hover:bg-[#6686DC] hover:no-underline hover:text-neutral-950"
                    } block rounded-md px-3 py-2 text-base font-medium focus:outline-none`}
                  >
                    {menuItem.title}
                  </button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Header;
