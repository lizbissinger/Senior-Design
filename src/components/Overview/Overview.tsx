import React, { useEffect, useState } from "react";
import "./Overview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import DriverDropdown from "../DriverDropdown/DriverDropdown";
import InvoiceGenerator from "../Invoice/InvoiceGenerator";
import GetAllLoads, {
  CreateNewLoad,
  DeleteLoad,
  UpdateLoad,
} from "../../routes/loadDetails";
import GetAllDrivers from "../../routes/driverDetails";
import GetAllTrucks from "../../routes/truckDetails";
import GetAllTrailers from "../../routes/trailerDetails";
import TrailerDropdown from "../TrailerForm/TrailerDropdown";
import TruckDropdown from "../TruckForm/TruckDropdown";
import StatusBars from "../OverviewCharts/StatusBars";
import TotalPricePerDriverChart from "../OverviewCharts/TotalPricePerDriverChart";
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
  Button,
  Dialog,
  DialogPanel,
  Divider,
  TextInput,
  NumberInput,
} from "@tremor/react";

import _ from "lodash"; //Sorting Library

import { LoadDetail } from "../Types/types";

const Overview: React.FC = () => {
  const [drivers, setDrivers] = useState<string[]>([]);
  const [trucks, setTrucks] = useState<string[]>([]);
  const [trailers, setTrailers] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  console.log("Driver", drivers);
  const [loadDetails, setLoadDetails] = useState<LoadDetail[]>([]);
  const [newLoad, setNewLoad] = useState<LoadDetail>({
    _id: "",
    loadNumber: "",
    truckObject: "",
    trailerObject: "",
    driverObject: "",
    pickupTime: "",
    deliveryTime: "",
    documents: "",
    price: "",
    detention: "",
    detentionPrice: "",
    allMiles: "",
    fuelGallons: "",
    status: "",
    brokerInfo: {
      name: "",
      phoneNumber: "",
      email: "",
      company: "",
    },
    comments: "",
  });

  const [assignedDrivers, setAssignedDrivers] = useState<string[]>([]);
  const [assignedTrucks, setAssignedTrucks] = useState<string[]>([]);
  const [assignedTrailers, setAssignedTrailers] = useState<string[]>([]);

  const fetchAllLoads = async () => {
    let allLoads: any = null;
    allLoads = await GetAllLoads();
    if (allLoads) {
      let loadsArr: LoadDetail[] = [];
      if (Array.isArray(allLoads)) {
        allLoads.forEach((element) => {
          let load: LoadDetail = JSON.parse(JSON.stringify(element));
          loadsArr.push(load);
        });
      }
      setLoadDetails(loadsArr);
    }

    let inProgressDrivers: string[] = [];
    if (Array.isArray(allLoads)) {
      allLoads.forEach((load) => {
        if (load.status === "In Progress" && load.driverObject) {
          inProgressDrivers.push(load.driverObject);
        }
      });
    }
    setAssignedDrivers(inProgressDrivers);

    let inProgressTrucks: string[] = [];
    if (Array.isArray(allLoads)) {
      allLoads.forEach((load) => {
        if (load.status === "In Progress" && load.truckObject) {
          inProgressTrucks.push(load.truckObject);
        }
      });
    }
    setAssignedTrucks(inProgressTrucks);

    let inProgressTrailers: string[] = [];
    if (Array.isArray(allLoads)) {
      allLoads.forEach((load) => {
        if (load.status === "In Progress" && load.trailerObject) {
          inProgressTrailers.push(load.trailerObject);
        }
      });
    }
    setAssignedTrailers(inProgressTrailers);
  };

  const fetchDrivers = async () => {
    try {
      const driverList = await GetAllDrivers();

      if (driverList) {
        const driverNames = driverList.map((driver) => driver.name);
        setDrivers(driverNames);
      }
    } catch (error) {}
  };

  const fetchTrucks = async () => {
    try {
      const truckList = await GetAllTrucks();

      if (truckList) {
        const truckNames = truckList.map((truck) => truck.truckNumber);
        setTrucks(truckNames);
      }
    } catch (error) {}
  };

  const fetchTrailers = async () => {
    try {
      const trailerList = await GetAllTrailers();

      if (trailerList) {
        const trailerNames = trailerList.map(
          (trailer) => trailer.trailerNumber
        );
        setTrailers(trailerNames);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchTrucks();
    fetchTrailers();
    fetchDrivers();
    fetchAllLoads();
  }, []);

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "", // Initialize with an empty key
    direction: "asc", // Set the initial direction to "asc"
  });

  const [fetchingActive, setFetchingActive] = useState(false);

  const sortedData = _.orderBy(
    loadDetails,
    [sortConfig.key],
    [sortConfig.direction]
  );

  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  const handleDriverSelect = (selectedDriver: string) => {
    setNewLoad({ ...newLoad, driverObject: selectedDriver });
  };

  const handleTruckSelect = (selectedTruck: string) => {
    setNewLoad({ ...newLoad, truckObject: selectedTruck });
  };

  const handleTrailerSelect = (selectedTrailer: string) => {
    setNewLoad({ ...newLoad, trailerObject: selectedTrailer });
  };

  const addLoadDetail = async () => {
    const loadWithToDoStatus = { ...newLoad, status: "To-Do" };
    const returnedLoad = await CreateNewLoad(loadWithToDoStatus);
    if (returnedLoad) {
      setLoadDetails([...loadDetails, returnedLoad]);
    }
    setNewLoad({
      _id: "",
      loadNumber: "",
      truckObject: "",
      trailerObject: "",
      driverObject: "",
      pickupTime: "",
      deliveryTime: "",
      documents: "",
      price: "",
      detention: "",
      detentionPrice: "",
      allMiles: "",
      fuelGallons: "",
      status: "",
      brokerInfo: {
        name: "",
        phoneNumber: "",
        email: "",
        company: "",
      },
      comments: "",
    });
    setShowForm(false);
    setIsOpen(false);
  };

  const deleteLoad = async (id: string) => {
    await DeleteLoad(id);
  };

  const updateLoad = async (load: LoadDetail) => {
    await UpdateLoad(load);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleEditClick = (index: number) => {
    setEditableIndex(index);
  };

  const handleSaveClick = (index: number) => {
    updateLoad(loadDetails[index]);
    const updatedLoadDetails = [...loadDetails];
    updatedLoadDetails[index] = loadDetails[index];
    setLoadDetails(updatedLoadDetails);
    setEditableIndex(null);
  };

  const handleDeleteClick = (index: number) => {
    deleteLoad(loadDetails[index]._id);
    const updatedLoadDetails = [...loadDetails];
    updatedLoadDetails.splice(index, 1);
    setLoadDetails(updatedLoadDetails);
  };

  const renderSortArrow = (column: string) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleNewLoadSubmit = (event: any) => {
    event.preventDefault();
    setSubmitting(true);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    loadDetails.forEach((load) => {
      total += parseFloat(load.price) || 0;
    });
    setTotalPrice(total);
  };

  const fetchData = async () => {
    if (!fetchingActive) {
      const testData = GetAllLoads();
      console.log(testData);
      setFetchingActive(true);
    }
  };
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [toDoCount, setToDoCount] = useState(0);

  useEffect(() => {
    fetchAllLoads().then(() => {
      // Calculate the counts for each status after data is fetched
      const inProgressCount = loadDetails.filter(
        (load) => load.status === "In Progress"
      ).length;
      const completedCount = loadDetails.filter(
        (load) => load.status === "Completed"
      ).length;
      const toDoCount = loadDetails.filter(
        (load) => load.status === "To-Do"
      ).length;

      // total price
      calculateTotalPrice();

      // Update the counts
      setInProgressCount(inProgressCount);
      setCompletedCount(completedCount);
      setToDoCount(toDoCount);
    });
    let errorsArr: string[] = [];
    Object.entries(errors).map(([key, value]) => {
      if (typeof value === "string") {
        if (value.length > 0) {
          errorsArr.push(key);
        }
      }
    });
    if (Object.keys(errorsArr).length === 0 && submitting) {
      addLoadDetail();
    }
    setSubmitting(false);
  }, [errors, loadDetails]);

  const isMobileView = window.innerWidth <= 767;
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="overview-container">
      <Grid
        numItems={isMobileView ? 1 : 2}
        numItemsMd={1}
        numItemsSm={1}
        numItemsLg={3}
        className="gap-4"
      >
        <StatusBars
          toDoCount={toDoCount}
          inProgressCount={inProgressCount}
          completedCount={completedCount}
        />
        <TotalPricePerDriverChart loadDetails={loadDetails} />
      </Grid>
      <>
        <div className="main-button">
          <Button onClick={() => setIsOpen(true)}>Add Load</Button>
        </div>
        <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
          <DialogPanel>
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Load Information
            </h3>
            <form className="mt-8">
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="loadNumber"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Load Number<span className="text-red-500">*</span>
                  </label>
                  <TextInput
                    type="text"
                    id="loadNumber"
                    placeholder="Load #"
                    value={newLoad.loadNumber}
                    onChange={(e) =>
                      setNewLoad({ ...newLoad, loadNumber: e.target.value })
                    }
                    className="mt-2"
                    required
                  />
                </div>
                <div className="col-span-full sm:col-span-2">
                  <label
                    htmlFor="driverDropdown"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Driver
                    <span className="text-red-500">*</span>
                  </label>
                  <DriverDropdown
                    driverList={drivers}
                    selectedDriver={newLoad.driverObject}
                    assignedDrivers={assignedDrivers}
                    onSelectDriver={handleDriverSelect}
                  />
                </div>
                <div className="col-span-full sm:col-span-2">
                  <label
                    htmlFor="truckDropdown"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Truck
                    <span className="text-red-500">*</span>
                  </label>
                  <TruckDropdown
                    truckList={trucks}
                    assignedTrucks={assignedTrucks}
                    selectedTruck={newLoad.truckObject}
                    onSelectTruck={handleTruckSelect}
                  />
                </div>
                <div className="col-span-full sm:col-span-2">
                  <label
                    htmlFor="trailerDropdown"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Trailer
                    <span className="text-red-500">*</span>
                  </label>
                  <TrailerDropdown
                    trailerList={trailers}
                    assignedTrailers={assignedTrailers}
                    selectedTrailer={newLoad.trailerObject}
                    onSelectTrailer={handleTrailerSelect}
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Price
                    <span className="text-red-500">*</span>
                  </label>
                  <NumberInput
                    id="price"
                    placeholder="Price"
                    value={newLoad.price}
                    onChange={(e) =>
                      setNewLoad({ ...newLoad, price: e.target.value })
                    }
                    className="mt-2"
                    required
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="detentionPrice"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Detention Price
                  </label>
                  <NumberInput
                    id="detentionPrice"
                    placeholder="Detention"
                    value={newLoad.detentionPrice}
                    onChange={(e) =>
                      setNewLoad({ ...newLoad, detentionPrice: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="Miles"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Miles
                    <span className="text-red-500">*</span>
                  </label>
                  <NumberInput
                    id="allMiles"
                    placeholder="Miles"
                    value={newLoad.allMiles}
                    onChange={(e) =>
                      setNewLoad({ ...newLoad, allMiles: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="Fuel"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Fuel
                  </label>
                  <NumberInput
                    id="fuelGallons"
                    placeholder="Fuel"
                    value={newLoad.fuelGallons}
                    onChange={(e) =>
                      setNewLoad({ ...newLoad, fuelGallons: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="pickupLocation"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Pick-up Location
                  </label>
                  <TextInput
                    type="text"
                    id="pickupLocation"
                    autoComplete="address-level2"
                    placeholder="Pick-up Location"
                    className="mt-2"
                  />
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="deliveryLocation"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Delivery Location
                  </label>
                  <TextInput
                    type="text"
                    id="deliveryLocation"
                    autoComplete="address-level2"
                    placeholder="Delivery Location"
                    className="mt-2"
                  />
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="pickupTime"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Pick-up Date & Time
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="pickupTime"
                    type="datetime-local"
                    placeholder="Pick-Up Time"
                    value={newLoad.pickupTime}
                    onChange={(e) =>
                      setNewLoad({ ...newLoad, pickupTime: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="deliveryTime"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Delivery Date & Time
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="deliveryTime"
                    type="datetime-local"
                    placeholder="Delivery Time"
                    value={newLoad.deliveryTime}
                    onChange={(e) =>
                      setNewLoad({ ...newLoad, deliveryTime: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="documents"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Documents
                  </label>
                  <input
                    id="documents"
                    type="file"
                    placeholder="Documents"
                    value={newLoad.documents}
                    onChange={(e) =>
                      setNewLoad({ ...newLoad, documents: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
              </div>
              <Divider />
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                  type="button"
                  className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNewLoadSubmit}
                  type="submit"
                  className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                >
                  Add
                </button>
              </div>
            </form>
          </DialogPanel>
        </Dialog>
      </>

      <div>
        <p></p>
        <div className="table-container">
          <Table className="table">
            {/* The table headers */}
            <TableHead>
              <TableRow>
                <th className="sort" onClick={() => requestSort("loadNumber")}>
                  {" "}
                  Load #{" "}
                  {sortConfig.key === "loadNumber" &&
                  sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"}
                </th>
                <th>Truck #</th>
                <th>Trailer #</th>
                <th>Driver Name</th>
                <th>Pick-up Time</th>
                <th>Delivery Time</th>
                <th>Documents</th>
                <th className="sort" onClick={() => requestSort("price")}>
                  {" "}
                  Price{" "}
                  {sortConfig.key === "price" && sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"}
                </th>
                <th>Detention</th>
                <th>All miles</th>
                <th className="sort" onClick={() => requestSort("fuelGallons")}>
                  {" "}
                  Gallons{" "}
                  {sortConfig.key === "fuelGallons" &&
                  sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"}
                </th>
                <th className="sort" onClick={() => requestSort("status")}>
                  {" "}
                  Status{" "}
                  {sortConfig.key === "status" && sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"}
                </th>
                {/* <th>Broker info</th>
              <th>Name</th>
              <th>Phone number</th>
              <th>Email</th> */}
                <th>Action</th>
              </TableRow>
            </TableHead>
            {/* The table body */}
            <TableBody>
              {sortedData.map((load, index) => (
                <TableRow key={index}>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="text"
                        value={load.loadNumber}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.loadNumber = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      load.loadNumber
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <TruckDropdown
                        truckList={trucks}
                        assignedTrucks={assignedTrucks}
                        selectedTruck={load.truckObject}
                        onSelectTruck={(selectedTruck) => {
                          const updatedLoad = { ...load };
                          updatedLoad.truckObject = selectedTruck;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      <div>{load.truckObject}</div>
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <TrailerDropdown
                        trailerList={trailers}
                        assignedTrailers={assignedTrailers}
                        selectedTrailer={load.trailerObject}
                        onSelectTrailer={(selectedTrailer) => {
                          const updatedLoad = { ...load };
                          updatedLoad.trailerObject = selectedTrailer;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      <div>{load.trailerObject}</div>
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <DriverDropdown
                        driverList={drivers}
                        selectedDriver={load.driverObject}
                        assignedDrivers={assignedDrivers}
                        onSelectDriver={(selectedDriver) => {
                          const updatedLoad = { ...load };
                          updatedLoad.driverObject = selectedDriver;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      <div>{load.driverObject}</div>
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="datetime-local"
                        value={load.pickupTime}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.pickupTime = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      load.pickupTime
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="datetime-local"
                        value={load.deliveryTime}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.deliveryTime = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      load.deliveryTime
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="text"
                        value={load.documents}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.documents = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      load.documents
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="number"
                        value={load.price}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.price = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      `$${parseFloat(load.price).toFixed(2)}`
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="number"
                        value={load.detentionPrice}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.detentionPrice = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : load.detentionPrice ||
                      parseInt(load.detentionPrice) >= 0 ? (
                      `$${parseFloat(load.detentionPrice).toFixed(2)}`
                    ) : (
                      ``
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="number"
                        value={load.allMiles}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.allMiles = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      load.allMiles
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="number"
                        value={load.fuelGallons}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.fuelGallons = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      load.fuelGallons
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <select
                        className="load-details-table"
                        value={load.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          const updatedLoad = { ...load, status: newStatus };
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                          // Updating load details with status immediately here upon selection of the status
                          updateLoad(updatedLoad);
                        }}
                      >
                        <option value="To-Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      load.status
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <div className="relative flex items-center">
                        <PencilIcon
                          className="w-6 mr-2 ml-1 mb-1 cursor-pointer"
                          onClick={() => handleSaveClick(index)}
                        />
                        <TrashIcon
                          className="w-6 mb-1 cursor-pointer"
                          onClick={() => handleDeleteClick(index)}
                        />
                      </div>
                    ) : (
                      <div className="relative flex items-center">
                        <PencilIcon
                          className="w-6 mr-2 ml-1 mb-1 cursor-pointer"
                          onClick={() => handleEditClick(index)}
                        />
                        <TrashIcon
                          className="w-6 mb-1 cursor-pointer"
                          onClick={() => handleDeleteClick(index)}
                        />
                      </div>
                    )}
                    <InvoiceGenerator loadDetails={[loadDetails[index]]} />
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
