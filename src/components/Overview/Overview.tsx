import React, { useEffect, useState } from "react";
import "./Overview.css";
import Autocomplete from "react-google-autocomplete";
const Google_Maps_Api_Key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Bars3Icon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
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
import LoadDetailsView from "./LoadDetailsView";
import TotalPricePerDriverChart from "../OverviewCharts/TotalPricePerDriverChart";
import { Tooltip } from "@mui/material";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  SearchSelect,
  SearchSelectItem,
  Grid,
  Button,
  Dialog,
  DialogPanel,
  Divider,
  TextInput,
  NumberInput,
  DateRangePicker,
  DateRangePickerValue,
  Select,
} from "@tremor/react";

import _ from "lodash";

import { LoadDetail } from "../Types/types";
import { load } from "mime";

const Overview: React.FC = () => {
  const [drivers, setDrivers] = useState<string[]>([]);
  const [trucks, setTrucks] = useState<string[]>([]);
  const [trailers, setTrailers] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [originalLoadDetails, setOriginalLoadDetails] = useState<LoadDetail[]>(
    []
  );
  const [filteredLoads, setFilteredLoads] = useState<LoadDetail[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateRangePickerValue | null>(
    null
  );
  const [selectedLoadNumber, setSelectedLoadNumber] = useState<string | null>(
    null
  );
  const [loadDetails, setLoadDetails] = useState<LoadDetail[]>([]);
  const [newLoad, setNewLoad] = useState<LoadDetail>({
    _id: "",
    loadNumber: "",
    truckObject: "",
    trailerObject: "",
    driverObject: "",
    pickupTime: "",
    deliveryTime: "",
    pickupLocation: "",
    deliveryLocation: "",
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

  useEffect(() => {
    if (newLoad.pickupLocation && newLoad.deliveryLocation) {
      calculateDistance();
    }
  }, [newLoad.pickupLocation, newLoad.deliveryLocation]);

  const calculateDistance = async () => {
    if (newLoad.pickupLocation && newLoad.deliveryLocation) {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [newLoad.pickupLocation],
          destinations: [newLoad.deliveryLocation],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (
          response: google.maps.DistanceMatrixResponse,
          status: google.maps.DistanceMatrixStatus
        ) => {
          if (status === "OK" && response.rows[0].elements[0].status === "OK") {
            const distanceMeters = response.rows[0].elements[0].distance.value;
            const distanceMiles = Math.round(distanceMeters * 0.000621371);
            setNewLoad((prevState) => ({
              ...prevState,
              allMiles: distanceMiles.toString(),
            }));
          } else {
            console.error("Failed to fetch distance:", status);
            setNewLoad((prevState) => ({
              ...prevState,
              allMiles: "",
            }));
          }
        }
      );
    }
  };

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "",
    direction: "asc",
  });

  const [fetchingActive, setFetchingActive] = useState(false);

  const filteredLoadDetails = selectedStatus
    ? loadDetails.filter((load) => load.status === selectedStatus)
    : loadDetails;

  const sortedData = _.orderBy(
    filteredLoadDetails,
    [sortConfig.key],
    [sortConfig.direction]
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSelectChange = (selectedValue: any) => {
    setSearchTerm(String(selectedValue));
  };

  const handleDateRangeChange = (value: DateRangePickerValue) => {
    setSelectedDate(value);
  };

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    const filterLoads = () => {
      const filteredLoads = loadDetails.filter((load) => {
        const matchesStatus = !selectedStatus || load.status === selectedStatus;
        const matchesSearchTerm = load.loadNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        if (selectedDate && selectedDate.from && selectedDate.to) {
          const startDate = new Date(selectedDate.from);
          const endDate = new Date(selectedDate.to);
          const deliveryDate = new Date(load.deliveryTime);

          return (
            matchesStatus &&
            matchesSearchTerm &&
            deliveryDate >= startDate &&
            deliveryDate <= endDate
          );
        } else {
          return matchesStatus && matchesSearchTerm;
        }
      });

      setFilteredLoads(filteredLoads);
    };

    filterLoads();
  }, [selectedDate, selectedStatus, loadDetails, searchTerm]);

  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [deletableIndex, setDeletableIndex] = useState<number | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit" | "delete">("add");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
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
      pickupLocation: "",
      deliveryLocation: "",
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

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const updateLoad = async (load: LoadDetail) => {
    await UpdateLoad(load);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleEditClick = (index: number) => {
    const selectedLoad = filteredLoads[index];
    setEditableIndex(index);
    setFormMode("edit");
    setNewLoad({ ...selectedLoad });
    setIsOpen(true);
  };
  
  const handleSaveClick = (index: number) => {
    updateLoad(filteredLoads[index]);
    const updatedLoadDetails = [...loadDetails];
    updatedLoadDetails[index] = filteredLoads[index];
    setLoadDetails(updatedLoadDetails);
    setEditableIndex(null);
  };

  const handleCancelClick = () => {
    resetForm();
    setFormMode("add");
    setEditableIndex(null);
    setShowForm(false);
    setIsOpen(false);
  };

  const resetForm = () => {
    setNewLoad({
      _id: "",
      loadNumber: "",
      truckObject: "",
      trailerObject: "",
      driverObject: "",
      pickupTime: "",
      deliveryTime: "",
      pickupLocation: "",
      deliveryLocation: "",
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
    setFormMode("add");
    setEditableIndex(null);
    setDeletableIndex(null);
    setShowForm(false);
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    if (editableIndex !== null) {
      deleteLoad(filteredLoads[editableIndex]._id);
      const updatedLoadDetails = [...loadDetails];
      const filteredLoadIndex = loadDetails.findIndex(load => load._id === filteredLoads[editableIndex]._id);
      
      if (filteredLoadIndex !== -1) {
        updatedLoadDetails.splice(filteredLoadIndex, 1);
        setLoadDetails(updatedLoadDetails);
      }
  
      resetForm();
      setFormMode("add");
      setEditableIndex(null);
      setShowForm(false);
      setIsOpen(false);
      setIsDeleteDialogOpen(false);
    }
  };  

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);

    if (formMode === "add") {
      addLoadDetail();
    } else if (formMode === "edit" && editableIndex !== null) {
      updateLoad(newLoad);

      const updatedLoadDetails = [...loadDetails];
      updatedLoadDetails[editableIndex] = newLoad;
      setLoadDetails(updatedLoadDetails);

      resetForm();
      setFormMode("add");
      setEditableIndex(null);
      setShowForm(false);
      setIsOpen(false);
    }

    setSubmitting(false);
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
      const inProgressCount = loadDetails.filter(
        (load) => load.status === "In Progress"
      ).length;
      const completedCount = loadDetails.filter(
        (load) => load.status === "Completed"
      ).length;
      const toDoCount = loadDetails.filter(
        (load) => load.status === "To-Do"
      ).length;

      calculateTotalPrice();

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

  const getBadgeClass = (status: string) => {
    switch (status) {
      case "To-Do":
        return "badge-primary";
      case "In Progress":
        return "badge-warning";
      case "Completed":
        return "badge-success";
      default:
        return "badge-secondary";
    }
  };

  const filteredToDoCount = filteredLoads.filter(
    (load) => load.status === "To-Do"
  ).length;
  const filteredInProgressCount = filteredLoads.filter(
    (load) => load.status === "In Progress"
  ).length;
  const filteredCompletedCount = filteredLoads.filter(
    (load) => load.status === "Completed"
  ).length;

  const handleLoadNumberClick = (loadNumber: string) => {
    setSelectedLoadNumber(loadNumber);
  };

  const handleCloseDetailsView = () => {
    setSelectedLoadNumber(null);
  };

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
          filteredToDoCount={filteredToDoCount}
          filteredInProgressCount={filteredInProgressCount}
          filteredCompletedCount={filteredCompletedCount}
          onStatusClick={handleStatusClick}
          onDateRangeChange={handleDateRangeChange}
        />
        <TotalPricePerDriverChart loadDetails={loadDetails} />
      </Grid>
      <Divider />
      <>
        <div className="main-buttons">
          <SearchSelect
            placeholder="Search Load..."
            onValueChange={handleSearchSelectChange}
            className="mr-2 max-w-sm"
          >
            {loadDetails.map((load) => (
              <SearchSelectItem key={load.loadNumber} value={load.loadNumber}>
                {load.loadNumber}
              </SearchSelectItem>
            ))}
          </SearchSelect>
          <DateRangePicker
            className="DateRangePicker mr-2 max-w-md"
            onValueChange={handleDateRangeChange}
          />
          <Button className="main-button" onClick={() => setIsOpen(true)}>
            {formMode === "add" ? "Add Load" : "Update Load"}
          </Button>{" "}
        </div>
        <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
          <DialogPanel>
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Load Information
            </h3>
            <form className="mt-8">
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                <div className="col-span-full sm:col-span-3">
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
                    required
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
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
                    onSelectDriver={handleDriverSelect}
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="truckDropdown"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Truck
                    <span className="text-red-500">*</span>
                  </label>
                  <TruckDropdown
                    truckList={trucks}
                    selectedTruck={newLoad.truckObject}
                    onSelectTruck={handleTruckSelect}
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="trailerDropdown"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Trailer
                    <span className="text-red-500">*</span>
                  </label>
                  <TrailerDropdown
                    trailerList={trailers}
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
                    required
                  />
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="pickupLocation"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Pick-up Location
                    <span className="text-red-500">*</span>
                  </label>

                  <Autocomplete
                    apiKey={Google_Maps_Api_Key}
                    defaultValue={newLoad.pickupLocation}
                    inputAutocompleteValue={newLoad.pickupLocation}
                    onPlaceSelected={(place) => {
                      setNewLoad((newLoad) => ({
                        ...newLoad,
                        pickupLocation: place.formatted_address || "",
                      }));
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "us" },
                    }}
                  />
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="deliveryLocation"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Delivery Location
                    <span className="text-red-500">*</span>
                  </label>
                  <Autocomplete
                    apiKey={Google_Maps_Api_Key}
                    defaultValue={newLoad.deliveryLocation} 
                    inputAutocompleteValue={newLoad.deliveryLocation}
                    onPlaceSelected={(place) => {
                      setNewLoad((newLoad) => ({
                        ...newLoad,
                        deliveryLocation: place.formatted_address || "",
                      }));
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "us" },
                    }}
                  />
                  ;
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
                  />
                </div>
              </div>
              <Divider />
              <Dialog
                open={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
                static={true}
              >
                <DialogPanel>
                  <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Confirm Deletion
                  </h3>
                  <p>Are you sure you want to delete this load?</p>
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      onClick={handleCancelClick}
                      className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Cancel
                    </button>
                    <Button
                      onClick={handleDeleteClick}
                      className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-white bg-red-500 font-medium transition duration-300 ease-in-out transform hover:bg-red-700 hover:text-white dark:bg-red-500 dark:text-white dark:tremor-content-strong dark:hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </DialogPanel>
              </Dialog>

              <div
                className={`flex items-center ${
                  formMode === "edit" ? "justify-between" : "justify-end"
                } space-x-4`}
              >
                {formMode === "edit" && (
                  <Button
                    onClick={openDeleteDialog}
                    className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-white bg-red-500 font-medium transition duration-300 ease-in-out transform hover:bg-red-700 hover:text-white dark:bg-red-500 dark:text-white dark:tremor-content-strong dark:hover:bg-red-700"
                  >
                    Delete
                  </Button>
                )}
                {formMode === "edit" && editableIndex !== null && (
                  <InvoiceGenerator
                    loadDetails={[filteredLoads[editableIndex]]}
                  />
                )}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleCancelClick}
                    className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFormSubmit}
                    type="submit"
                    className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                  >
                    {formMode === "add" ? "Add" : "Update"}
                  </button>
                </div>
              </div>
            </form>
          </DialogPanel>
        </Dialog>
      </>

      <Grid
        numItems={isMobileView ? 1 : 2}
        numItemsLg={2}
        className={`gap-4 pt-3 load-details-container ${
          !selectedLoadNumber ? "hidden" : ""
        }`}
      >
        <div className="details-table">
          <Table className="table">
            {/* The table headers */}
            <TableHead className="sticky-header">
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
                <th>Pick-up Location</th>
                <th>Delivery Location</th>
                <th className="sort" onClick={() => requestSort("price")}>
                  {" "}
                  Price{" "}
                  {sortConfig.key === "price" && sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"}
                </th>
                <th>Loaded miles</th>
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
                <th></th>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLoads.map((load, index) => (
                <TableRow key={index}>
                  <td>
                    <Tooltip title="Show details">
                      <div
                        onClick={() => handleLoadNumberClick(load.loadNumber)}
                        style={{ cursor: "pointer" }}
                      >
                        {load.loadNumber}
                      </div>
                    </Tooltip>
                  </td>
                  <td>
                    <div>{load.truckObject}</div>
                  </td>
                  <td>
                    <div>{load.trailerObject}</div>
                  </td>
                  <td>
                    <div>{load.driverObject}</div>
                  </td>
                  <td>
                    <div>{load.pickupTime}</div>
                  </td>
                  <td>
                    <div>{load.deliveryTime}</div>
                  </td>
                  <td>
                    <div>{load.pickupLocation}</div>
                  </td>
                  <td>
                    <div>{load.deliveryLocation}</div>
                  </td>
                  <td>
                    <div>{load.price}</div>
                  </td>
                  <td>
                    <div>{load.allMiles}</div>
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <select
                        className="select-custom load-details-table"
                        value={load.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          const updatedLoad = { ...load, status: newStatus };
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });

                          updateLoad(updatedLoad);
                        }}
                      >
                        <option
                          className={`badge ${getBadgeClass(load.status)}`}
                        >
                          To Do
                        </option>
                        <option
                          className={`badge ${getBadgeClass(load.status)}`}
                        >
                          In Progress
                        </option>
                        <option
                          className={`badge ${getBadgeClass(load.status)}`}
                        >
                          Completed
                        </option>
                      </select>
                    ) : (
                      <span className={`badge ${getBadgeClass(load.status)}`}>
                        {load.status}
                      </span>
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <div className="flex items-center">
                        <Bars3Icon
                          className="w-6 mr-2 ml-1 mb-1 cursor-pointer"
                          onClick={() => handleSaveClick(index)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Bars3Icon
                          className="w-6 mr-2 ml-1 mb-1 cursor-pointer"
                          onClick={() => handleEditClick(index)}
                        />
                      </div>
                    )}
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div
          className="load-table table"
          style={{
            display: selectedLoadNumber ? "block" : "none",
            width: "37%",
          }}
        >
          {selectedLoadNumber && (
            <LoadDetailsView
              load={
                loadDetails.find(
                  (load) => load.loadNumber === selectedLoadNumber
                ) || null
              }
              onClose={handleCloseDetailsView}
            />
          )}
        </div>
      </Grid>
    </div>
  );
};

export default Overview;
