import React, { useEffect, useRef, useState } from "react";
import { DriverDetail, TruckDetail, TrailerDetail } from "../Types/types";
import "./VehiclesDetailsTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  MultiSelect,
  MultiSelectItem,
  Grid,
  TabPanels,
  TabPanel,
  Button,
  Divider,
} from "@tremor/react";
import { Tab, TabGroup, TabList } from "@tremor/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

type VehiclesDetailsTableProps = {
  drivers: DriverDetail[];
  trucks: TruckDetail[];
  trailers: TrailerDetail[];
  onDeleteDriver: (driver: DriverDetail, index: number) => void;
  onDeleteTruck: (truck: TruckDetail, index: number) => void;
  onDeleteTrailer: (trailer: TrailerDetail, index: number) => void;
  onEdit: (
    type: string,
    item: DriverDetail | TruckDetail | TrailerDetail
  ) => void;
};

const SkeletonLoading = () => (
  <div role="status">
    {[...Array(1)].map((_, index) => (
      <div>
        <div className="animate-pulse h-3.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-full mb-2.5"></div>
        {/* <Divider/> */}
      </div>
    ))}
    <span className="sr-only">Loading...</span>
  </div>
);

const VehiclesDetailsTable: React.FC<VehiclesDetailsTableProps> = ({
  drivers,
  trucks,
  trailers,
  onDeleteDriver,
  onDeleteTruck,
  onDeleteTrailer,
  onEdit,
}) => {
  const [driverSearch, setDriverSearch] = useState<string>("");
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>(
    drivers.map((driver) => driver.name)
  );
  const [truckSearch, setTruckSearch] = useState<string>("");
  const [selectedTrucks, setSelectedTrucks] = useState<string[]>(
    trucks.map((truck) => truck.truckNumber)
  );
  const [trailerSearch, setTrailerSearch] = useState<string>("");
  const [selectedTrailers, setSelectedTrailers] = useState<string[]>(
    trailers.map((trailer) => trailer.trailerNumber)
  );

  const handleDriverSelectionChange = (selectedItems: string[]) => {
    console.log("Selected Drivers:", selectedItems);
    setSelectedDrivers(selectedItems);
  };

  const handleTruckSelectionChange = (selectedItems: string[]) => {
    console.log("Selected Trucks:", selectedItems);
    setSelectedTrucks(selectedItems);
  };

  const handleTrailerSelectionChange = (selectedItems: string[]) => {
    console.log("Selected Trailers:", selectedItems);
    setSelectedTrailers(selectedItems);
  };

  // Filter drivers based on search and selected drivers
  const filteredDrivers = drivers.filter((driver) => {
    const searchLowerCase = driverSearch.toLowerCase();
    const isSelected = selectedDrivers.includes(driver.name);

    // Show all drivers if there's no search and no selected drivers
    if (!driverSearch && selectedDrivers.length === 0) {
      return true;
    }

    return (
      isSelected &&
      (driver.name.toLowerCase().includes(searchLowerCase) ||
        driver.licenseNumber.toLowerCase().includes(searchLowerCase) ||
        driver.phoneNumber.toLowerCase().includes(searchLowerCase) ||
        driver.email.toLowerCase().includes(searchLowerCase))
    );
  });

  // Filter trucks based on search and selected trucks
  const filteredTrucks = trucks.filter((truck) => {
    const searchLowerCase = truckSearch.toLowerCase();
    const isSelected = selectedTrucks.includes(truck.truckNumber);

    // Show all trucks if there's no search and no selected trucks
    if (!truckSearch && selectedTrucks.length === 0) {
      return true;
    }

    return (
      isSelected &&
      (truck.truckNumber.toLowerCase().includes(searchLowerCase) ||
        truck.make.toLowerCase().includes(searchLowerCase) ||
        truck.model.toLowerCase().includes(searchLowerCase) ||
        truck.year.toString().includes(searchLowerCase) ||
        truck.vin.toLowerCase().includes(searchLowerCase))
    );
  });

  // Filter trailers based on search and selected trailers
  const filteredTrailers = trailers.filter((trailer) => {
    const searchLowerCase = trailerSearch.toLowerCase();
    const isSelected = selectedTrailers.includes(trailer.trailerNumber);

    // Show all trailers if there's no search and no selected trailers
    if (!trailerSearch && selectedTrailers.length === 0) {
      return true;
    }

    return (
      isSelected &&
      (trailer.trailerNumber.toLowerCase().includes(searchLowerCase) ||
        trailer.make.toLowerCase().includes(searchLowerCase) ||
        trailer.model.toLowerCase().includes(searchLowerCase) ||
        trailer.year.toString().includes(searchLowerCase) ||
        trailer.vin.toLowerCase().includes(searchLowerCase))
    );
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (index: number) => {
    setActiveDropdownIndex(index === activeDropdownIndex ? null : index);
  };

  return (
    <Grid className="vehicles-details-container table-head">
      <TabGroup>
        <TabList variant="line" defaultValue="1">
          <Tab
            value="1"
            className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]"
          >
            Drivers
          </Tab>
          <Tab
            value="2"
            className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]"
          >
            Trucks
          </Tab>
          <Tab
            value="3"
            className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]"
          >
            Trailers
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="fleet-tables">
              <Card>
                <Title>Drivers</Title>
                <MultiSelect
                  onValueChange={handleDriverSelectionChange}
                  placeholder="Select Driver..."
                  className="max-w-xs"
                >
                  {drivers.map((driver, index) => (
                    <MultiSelectItem key={index} value={driver.name}>
                      {driver.name}
                    </MultiSelectItem>
                  ))}
                </MultiSelect>

                <Table className="mt-2 max-h-table">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Name
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        License #
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Phone #
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Email
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Action
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDrivers.map((driver, index) => (
                      <TableRow key={index}>
                        {isLoading ? (
                          <>{/* <SkeletonLoading /> */}</>
                        ) : (
                          <>
                            <TableCell>{driver.name}</TableCell>
                            <TableCell>{driver.licenseNumber}</TableCell>
                            <TableCell>{driver.phoneNumber}</TableCell>
                            <TableCell>{driver.email}</TableCell>
                            <TableCell className="relative">
                              <button
                                className="inline-flex items-center justify-center p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none cursor-pointer"
                                onClick={() => toggleDropdown(index)}
                                aria-expanded={activeDropdownIndex === index}
                                aria-controls={`driver-dropdown-${index}`}
                              >
                                <EllipsisHorizontalIcon className="w-6 h-6" />
                              </button>
                              {activeDropdownIndex === index && (
                                <div
                                  ref={dropdownRef}
                                  id={`driver-dropdown-${index}`}
                                  className="absolute z-10 w-40 bg-slate-50 dark:bg-slate-850 rounded-md shadow-lg dark:bg-gray-800 cursor-pointer"
                                >
                                  <ul className="mb-0">
                                    <li
                                      className="block px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                      onClick={() => {
                                        onEdit("driver", driver);
                                        toggleDropdown(index);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faPenAlt}
                                        className="mr-2"
                                      />{" "}
                                      Edit
                                    </li>
                                    <li
                                      className="block px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                      onClick={() => {
                                        onDeleteDriver(driver, index);
                                        toggleDropdown(index);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="mr-2"
                                      />{" "}
                                      Delete
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                    {isLoading &&
                      [...Array(8)].map((_, index) => (
                        <TableRow key={index}>
                          <TableCell colSpan={5}>
                            <SkeletonLoading />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="fleet-tables">
              <Card>
                <Title>Trucks</Title>
                <MultiSelect
                  onValueChange={handleTruckSelectionChange}
                  placeholder="Select Truck..."
                  className="max-w-xs"
                >
                  {trucks.map((truck, index) => (
                    <MultiSelectItem key={index} value={truck.truckNumber}>
                      {truck.truckNumber}
                    </MultiSelectItem>
                  ))}
                </MultiSelect>
                <Table className="mt-2 max-h-table">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Number
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Make
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Model
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Year
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        VIN
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Action
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTrucks.map((truck, index) => (
                      <TableRow key={index}>
                        <TableCell>{truck.truckNumber}</TableCell>
                        <TableCell>{truck.make}</TableCell>
                        <TableCell>{truck.model}</TableCell>
                        <TableCell>{truck.year}</TableCell>
                        <TableCell>{truck.vin}</TableCell>
                        <TableCell>
                          <div className="relative">
                            <button
                              className="inline-flex items-center justify-center p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none cursor-pointer"
                              onClick={() => toggleDropdown(index)}
                              aria-expanded={activeDropdownIndex === index}
                              aria-controls={`truck-dropdown-${index}`}
                            >
                              <EllipsisHorizontalIcon className="w-6 h-6" />
                            </button>
                            {activeDropdownIndex === index && (
                              <div
                                ref={dropdownRef}
                                id={`truck-dropdown-${index}`}
                                className="absolute z-10 w-40 bg-slate-50 dark:bg-slate-850 rounded-md shadow-lg dark:bg-gray-800 cursor-pointer"
                              >
                                <ul className="mb-0">
                                  <li
                                    className="block px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => {
                                      onEdit("truck", truck);
                                      toggleDropdown(index);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPenAlt}
                                      className="mr-2"
                                    />{" "}
                                    Edit
                                  </li>
                                  <li
                                    className="block px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => {
                                      onDeleteTruck(truck, index);
                                      toggleDropdown(index);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="mr-2"
                                    />{" "}
                                    Delete
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="fleet-tables">
              <Card>
                <Title>Trailers</Title>
                <MultiSelect
                  onValueChange={handleTrailerSelectionChange}
                  placeholder="Select Trailer..."
                  className="max-w-xs"
                >
                  {trailers.map((trailer, index) => (
                    <MultiSelectItem key={index} value={trailer.trailerNumber}>
                      {trailer.trailerNumber}
                    </MultiSelectItem>
                  ))}
                </MultiSelect>
                <Table className="mt-2 max-h-table">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Number
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Make
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Model
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Year
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        VIN
                      </TableHeaderCell>
                      <TableHeaderCell className="sticky-header sticky-header-background dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Action
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTrailers.map((trailer, index) => (
                      <TableRow key={index}>
                        <TableCell>{trailer.trailerNumber}</TableCell>
                        <TableCell>{trailer.make}</TableCell>
                        <TableCell>{trailer.model}</TableCell>
                        <TableCell>{trailer.year}</TableCell>
                        <TableCell>{trailer.vin}</TableCell>
                        <TableCell>
                          <div className="relative">
                            <button
                              className="relative inline-flex items-center justify-center p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none cursor-pointer"
                              onClick={() => toggleDropdown(index)}
                              aria-expanded={activeDropdownIndex === index}
                              aria-controls={`trailer-dropdown-${index}`}
                            >
                              <EllipsisHorizontalIcon className="w-6 h-6" />
                            </button>
                            {activeDropdownIndex === index && (
                              <div
                                ref={dropdownRef}
                                id={`trailer-dropdown-${index}`}
                                className="absolute z-10 w-40 bg-slate-50 dark:bg-slate-850 rounded-md shadow-lg dark:bg-gray-800 cursor-pointer"
                              >
                                <ul className="mb-0">
                                  <li
                                    className="block px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => {
                                      onEdit("trailer", trailer);
                                      toggleDropdown(index);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPenAlt}
                                      className="mr-2"
                                    />{" "}
                                    Edit
                                  </li>
                                  <li
                                    className="block px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => {
                                      onDeleteTrailer(trailer, index);
                                      toggleDropdown(index);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="mr-2"
                                    />{" "}
                                    Delete
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Grid>
  );
};

export default VehiclesDetailsTable;
