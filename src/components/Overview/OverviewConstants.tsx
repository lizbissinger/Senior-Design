import React, { useEffect, useState } from "react";
import "./Overview.css";
import {
  CreateNewLoad,
  DeleteLoad,
  UpdateLoad,
} from "../../routes/loadDetails";
import {
  fetchAllLoads,
  fetchDrivers,
  fetchTrucks,
  fetchTrailers,
  calculateDistance,
} from "./OverviewUtils";
import {
  Button,
  Dialog,
  DialogPanel,
  Divider,
  TextInput,
  NumberInput,
  DateRangePickerValue,
} from "@tremor/react";
import Autocomplete from "react-google-autocomplete";
const Google_Maps_Api_Key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import DriverDropdown from "../DriverDropdown/DriverDropdown";
import InvoiceGenerator from "../Invoice/InvoiceGenerator";
import TrailerDropdown from "../TrailerForm/TrailerDropdown";
import TruckDropdown from "../TruckForm/TruckDropdown";

import _ from "lodash";

import { LoadDetail } from "../Types/types";

export const useOverviewState = () => {
  const [drivers, setDrivers] = useState<string[]>([]);
  const [trucks, setTrucks] = useState<string[]>([]);
  const [trailers, setTrailers] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isStatusEditing, setIsStatusEditing] = useState(false);
  const [editingLoadIndex, setEditingLoadIndex] = useState<number | null>(null);
  const [filteredLoads, setFilteredLoads] = useState<LoadDetail[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateRangePickerValue | null>(
    null
  );
  const [selectedLoadNumber, setSelectedLoadNumber] = useState<string | null>(
    null
  );
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredLoads]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(filteredLoads.length / itemsPerPage);

  const handlePageChange = (newPage: React.SetStateAction<number>) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (
    newItemsPerPage: React.SetStateAction<number>
  ) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
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
    documents: [],
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
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    const fetchAndSetTrailers = async () => {
      const fetchedTrailers = await fetchTrailers();
      setTrailers(fetchedTrailers);
    };

    const fetchAndSetTrucks = async () => {
      const fetchedTrucks = await fetchTrucks();
      setTrucks(fetchedTrucks);
    };

    const fetchAndSetDrivers = async () => {
      const fetchedDrivers = await fetchDrivers();
      setDrivers(fetchedDrivers);
    };

    const fetchAndSetAllLoads = async () => {
      const loads = await fetchAllLoads();
      setLoadDetails(loads);
    };
    fetchAndSetTrailers();
    fetchAndSetTrucks();
    fetchAndSetDrivers();
    fetchAndSetAllLoads();
  }, []);

  useEffect(() => {
    const handleDistanceCalculation = async () => {
      if (newLoad.pickupLocation && newLoad.deliveryLocation) {
        try {
          const distanceMiles = await calculateDistance(
            newLoad.pickupLocation,
            newLoad.deliveryLocation
          );
          setNewLoad((prevState) => ({
            ...prevState,
            allMiles: distanceMiles,
          }));
        } catch (error) {
          console.error(error);
          setNewLoad((prevState) => ({
            ...prevState,
            allMiles: "",
          }));
        }
      }
    };
    handleDistanceCalculation();
  }, [newLoad.pickupLocation, newLoad.deliveryLocation]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(loadingInterval);
          setIsLoading(false);
        }
        return newProgress;
      });
    }, 60);

    return () => clearInterval(loadingInterval);
  }, []);

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "",
    direction: "asc",
  });

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
    const filterAndSortLoads = () => {
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

      const sortedData = _.orderBy(
        filteredLoads,
        [sortConfig.key],
        [sortConfig.direction]
      );

      setFilteredLoads(sortedData);
    };

    filterAndSortLoads();
  }, [selectedDate, selectedStatus, loadDetails, searchTerm, sortConfig]);

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

  const handleDocumentSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewLoad((current) => ({
        ...current,
        documents: filesArray,
      }));
    }
  };

  const addLoadDetail = async () => {
    const { documents, ...loadDetailsWithoutDocuments } = newLoad;

    const loadWithToDoStatus = {
      ...loadDetailsWithoutDocuments,
      status: "To-Do",
    };

    const returnedLoad = await CreateNewLoad(loadWithToDoStatus, documents);

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
      documents: [],
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
      createdAt: "",
      updatedAt: "",
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

  const handleEditClick = (index: number) => {
    const selectedLoad = filteredLoads[index];
    setEditableIndex(index);
    setFormMode("edit");
    setNewLoad({ ...selectedLoad });
    setIsOpen(true);
  };

  const handleSaveClick = async (index: number) => {
    const loadToUpdate = { ...filteredLoads[index], ...newLoad };

    try {
      await updateLoad(loadToUpdate);

      setLoadDetails((prevLoadDetails) =>
        prevLoadDetails.map((load) =>
          load._id === loadToUpdate._id ? loadToUpdate : load
        )
      );

      setEditableIndex(null);
      setShowForm(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error in handleSaveClick:", error);
    }
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
      documents: [],
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
      createdAt: "",
      updatedAt: "",
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
      const filteredLoadIndex = loadDetails.findIndex(
        (load) => load._id === filteredLoads[editableIndex]._id
      );

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

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    loadDetails.forEach((load) => {
      total += parseFloat(load.price) || 0;
    });
    setTotalPrice(total);
  };

  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [toDoCount, setToDoCount] = useState(0);
  const [notInvoicedCount, setNotInvoicedCount] = useState(0);
  const [invoicedCount, setInvoicedCount] = useState(0);
  const [receivedPaymentCount, setReceivedPaymentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllLoads();

      const inProgressCount = loadDetails.filter(
        (load) => load.status === "In Progress"
      ).length;
      const completedCount = loadDetails.filter(
        (load) => load.status === "Completed"
      ).length;
      const toDoCount = loadDetails.filter(
        (load) => load.status === "To-Do"
      ).length;
      const notInvoicedCount = loadDetails.filter(
        (load) => load.status === "Not Invoiced"
      ).length;
      const invoicedCount = loadDetails.filter(
        (load) => load.status === "Invoiced"
      ).length;
      const receivedPaymentCount = loadDetails.filter(
        (load) => load.status === "Received Payment"
      ).length;

      calculateTotalPrice();

      setInProgressCount(inProgressCount);
      setCompletedCount(completedCount);
      setToDoCount(toDoCount);
      setNotInvoicedCount(notInvoicedCount);
      setInvoicedCount(invoicedCount);
      setReceivedPaymentCount(receivedPaymentCount);
    };
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

  const addDialog = (
    <Dialog
      open={isOpen && formMode === "add"}
      onClose={() => setIsOpen(false)}
      static={true}
    >
      <DialogPanel>
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Load Information
        </h3>
        <form onSubmit={handleFormSubmit} className="mt-8">
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
                  setNewLoad({
                    ...newLoad,
                    loadNumber: e.target.value,
                  })
                }
                required
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Please enter the load number."
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
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
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Please enter the price."
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
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
                  setNewLoad({
                    ...newLoad,
                    detentionPrice: e.target.value,
                  })
                }
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
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  types: [],
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
                className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  types: [],
                  componentRestrictions: { country: "us" },
                }}
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
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="pickupTime"
                type="datetime-local"
                placeholder="Pick-Up Time"
                value={newLoad.pickupTime}
                onChange={(e) =>
                  setNewLoad({
                    ...newLoad,
                    pickupTime: e.target.value,
                  })
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
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="deliveryTime"
                type="datetime-local"
                placeholder="Delivery Time"
                value={newLoad.deliveryTime}
                onChange={(e) =>
                  setNewLoad({
                    ...newLoad,
                    deliveryTime: e.target.value,
                  })
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
                  setNewLoad({
                    ...newLoad,
                    allMiles: e.target.value,
                  })
                }
                required
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Please enter the miles."
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
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
                  setNewLoad({
                    ...newLoad,
                    fuelGallons: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="documents"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Documents
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer  dark:text-gray-400 focus:outline-none dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400"
                id="documents"
                type="file"
                placeholder="Documents"
                multiple
                onChange={handleDocumentSelectFile}
              />
              <p
                className="mt-1 mb-0 text-xs text-gray-700 dark:text-gray-300"
                id="file_input_help"
              >
                PDF, PNG or JPG (MAX. 5MB).
              </p>
            </div>
          </div>
          <Divider />

          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={handleCancelClick}
              className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="whitespace-nowrap rounded-tremor-default bg-[#779BFB] px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-[#6686DC] dark:bg-[#6686DC] dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-[#779BFB]"
            >
              Add
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );

  const updateDialog = (
    <Dialog
      open={isOpen && formMode === "edit"}
      onClose={() => setIsOpen(false)}
      static={true}
    >
      <DialogPanel>
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Load Information
        </h3>
        <form onSubmit={handleFormSubmit} className="mt-8">
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
                  setNewLoad({
                    ...newLoad,
                    loadNumber: e.target.value,
                  })
                }
                required
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Please enter the load number."
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
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
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Please enter the price."
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
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
                  setNewLoad({
                    ...newLoad,
                    detentionPrice: e.target.value,
                  })
                }
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
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  types: [],
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
                className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  types: [],
                  componentRestrictions: { country: "us" },
                }}
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
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="pickupTime"
                type="datetime-local"
                placeholder="Pick-Up Time"
                value={newLoad.pickupTime}
                onChange={(e) =>
                  setNewLoad({
                    ...newLoad,
                    pickupTime: e.target.value,
                  })
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
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="deliveryTime"
                type="datetime-local"
                placeholder="Delivery Time"
                value={newLoad.deliveryTime}
                onChange={(e) =>
                  setNewLoad({
                    ...newLoad,
                    deliveryTime: e.target.value,
                  })
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
                  setNewLoad({
                    ...newLoad,
                    allMiles: e.target.value,
                  })
                }
                required
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Please enter the miles."
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
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
                  setNewLoad({
                    ...newLoad,
                    fuelGallons: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="documents"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Documents
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer  dark:text-gray-400 focus:outline-none dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400"
                id="documents"
                type="file"
                placeholder="Documents"
                multiple
                onChange={handleDocumentSelectFile}
              />
              <p
                className="mt-1 mb-0 text-xs text-gray-700 dark:text-gray-300"
                id="file_input_help"
              >
                PDF, PNG or JPG (MAX. 5MB).
              </p>
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
          <div className="flex items-center justify-between space-x-4">
            <Button
              onClick={openDeleteDialog}
              className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-white bg-red-500 font-medium transition duration-300 ease-in-out transform hover:bg-red-700 hover:text-white dark:bg-red-500 dark:text-white dark:tremor-content-strong dark:hover:bg-red-700"
            >
              Delete
            </Button>
            {formMode === "edit" && editableIndex !== null && (
              <InvoiceGenerator loadDetails={[filteredLoads[editableIndex]]} />
            )}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancelClick}
                className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="whitespace-nowrap rounded-tremor-default bg-[#779BFB] px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-[#6686DC] dark:bg-[#6686DC] dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-[#779BFB]"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );

  return {
    drivers,
    setDrivers,
    trucks,
    setTrucks,
    trailers,
    setTrailers,
    totalPrice,
    setTotalPrice,
    selectedStatus,
    setSelectedStatus,
    isStatusEditing,
    setIsStatusEditing,
    editingLoadIndex,
    setEditingLoadIndex,
    filteredLoads,
    setFilteredLoads,
    selectedDate,
    setSelectedDate,
    selectedLoadNumber,
    setSelectedLoadNumber,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    startIndex,
    endIndex,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    loadDetails,
    setLoadDetails,
    newLoad,
    setNewLoad,
    isLoading,
    loadingProgress,
    sortConfig,
    setSortConfig,
    searchTerm,
    setSearchTerm,
    handleSearchSelectChange,
    handleDateRangeChange,
    handleStatusClick,
    editableIndex,
    setEditableIndex,
    deletableIndex,
    setDeletableIndex,
    formMode,
    setFormMode,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    showForm,
    setShowForm,
    errors,
    setErrors,
    submitting,
    setSubmitting,
    handleDriverSelect,
    handleTruckSelect,
    handleTrailerSelect,
    handleDocumentSelectFile,
    addLoadDetail,
    deleteLoad,
    openDeleteDialog,
    closeDeleteDialog,
    updateLoad,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    resetForm,
    handleDeleteClick,
    handleFormSubmit,
    requestSort,
    calculateTotalPrice,
    inProgressCount,
    setInProgressCount,
    completedCount,
    setCompletedCount,
    toDoCount,
    setToDoCount,
    notInvoicedCount,
    setNotInvoicedCount,
    invoicedCount,
    setInvoicedCount,
    receivedPaymentCount,
    setReceivedPaymentCount,
    isMobileView,
    isOpen,
    setIsOpen,
    addDialog,
    updateDialog,
  };
};
