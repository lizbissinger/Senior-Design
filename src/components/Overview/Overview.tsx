import React, { useEffect, useState } from "react";
import "./Overview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import{ PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
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
import { Grid, Col, Card, Text, Metric } from "@tremor/react";

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
    const returnedLoad = await CreateNewLoad(newLoad);
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

  const validateValues = (inputValues: LoadDetail) => {
    let errorsObj: any = {
      loadNumber: "",
      truckObject: "",
      trailerObject: "",
      driverObject: "",
      pickupTime: "",
      deliveryTime: "",
      documents: "",
      price: "",
      detentionPrice: "",
      allMiles: "",
      fuelGallons: "",
    };

    Object.entries(errorsObj).map(([key, value]) => {
      const inputField = document.getElementById(key);
      if (inputField) {
        inputField.classList.remove("invalid");
      }
    });

    if (inputValues.loadNumber.length == 0) {
      errorsObj.loadNumber = "Load # is required";
    }

    if (inputValues.truckObject.length == 0) {
      errorsObj.truckObject = "Truck # is required";
    }

    if (inputValues.trailerObject.length == 0) {
      errorsObj.trailerObject = "Trailer # is required";
    }

    if (inputValues.price.length == 0) {
      errorsObj.price = "Price is required";
    } else if (isNaN(parseInt(inputValues.price))) {
      errorsObj.price = "Price must be an amount";
    }

    if (inputValues.detentionPrice.length > 0) {
      if (isNaN(parseInt(inputValues.detentionPrice))) {
        errorsObj.detentionPrice = "Detention must be an amount";
      }
    }

    if (inputValues.allMiles.length == 0) {
      errorsObj.allMiles = "Miles are required";
    } else if (isNaN(parseInt(inputValues.allMiles))) {
      errorsObj.allMiles = "Miles must be a number";
    }

    if (inputValues.driverObject.length == 0) {
      errorsObj.driverObject = "Please select a driver";
    }

    Object.entries(errorsObj).map(([key, value]) => {
      if (typeof value === "string") {
        if (value.length > 0) {
          const inputField = document.getElementById(key);
          if (inputField) {
            inputField.classList.add("invalid");
          }
        }
      }
    });

    return errorsObj;
  };

  const handleNewLoadSubmit = (event: any) => {
    event.preventDefault();
    setErrors(validateValues(newLoad));
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

  return (
    <div className="overview-container">

      <Grid numItems={2} numItemsSm={2} numItemsLg={3} className="gap-2">
    <Col>
      <Card>
        <StatusBars
          toDoCount={toDoCount}
          inProgressCount={inProgressCount}
          completedCount={completedCount}
        />
      </Card>
    </Col>
    <Col>
      <Card>
        <TotalPricePerDriverChart loadDetails={loadDetails} />
      </Card>
    </Col>
    {/* You can add more components here within additional Col components */}
  </Grid>

      {showForm ? (
        <p className="closeButton" onClick={() => setShowForm(false)}>
          X
        </p>
      ) : null}
      <div>
        {!showForm ? (
          <div className="add-button">
            <button onClick={toggleFormVisibility}>
              <FontAwesomeIcon icon={faPlus} /> {/* Use the plus icon */}
            </button>
          </div>
        ) : (
          <form>
            <div className="form">
              {/* Input fields for adding new load details */}
              <div className="field">
                <input
                  id="loadNumber"
                  type="text"
                  placeholder="Load #"
                  value={newLoad.loadNumber}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, loadNumber: e.target.value })
                  }
                />
                <br />
                <div className="error">{errors.loadNumber}</div>
              </div>
              <div className="form">
                {/* Use the DriverDropdown component to select a driver */}
                <DriverDropdown
                  driverList={drivers}
                  selectedDriver={newLoad.driverObject}
                  onSelectDriver={handleDriverSelect}
                />
                <div className="error">{errors.driverObject}</div>
              </div>

              <div className="form">
                {/* Use the TruckDropdown component to select a truck */}
                <TruckDropdown
                  truckList={trucks}
                  selectedTruck={newLoad.truckObject}
                  onSelectTruck={handleTruckSelect}
                />
                <div className="error">{errors.truckObject}</div>
              </div>

              <div className="form">
                {/* Use the TrailerDropdown component to select a trailer */}
                <TrailerDropdown
                  trailerList={trailers}
                  selectedTrailer={newLoad.trailerObject}
                  onSelectTrailer={handleTrailerSelect}
                />
                <div className="error">{errors.trailerObject}</div>
              </div>

              <div className="field">
                {/* Use the DriverForm component to add new drivers */}
                {/* <DriverForm onAddDriver={handleAddDriver} /> */}
              </div>
              <div className="field">
                <input
                  id="pickupTime"
                  type="datetime-local"
                  placeholder="Pick-Up Time"
                  value={newLoad.pickupTime}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, pickupTime: e.target.value })
                  }
                />
                <br />
              </div>
              <div className="field">
                <input
                  id="deliveryTime"
                  type="datetime-local"
                  placeholder="Delivery Time"
                  value={newLoad.deliveryTime}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, deliveryTime: e.target.value })
                  }
                />
                <br />
              </div>
              <div className="field">
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
              <div className="field">
                <input
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={newLoad.price}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, price: e.target.value })
                  }
                />
                <br />
                <div className="error">{errors.price}</div>
              </div>
              <div className="field">
                <input
                  id="detentionPrice"
                  type="number"
                  placeholder="Detention"
                  value={newLoad.detentionPrice}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, detentionPrice: e.target.value })
                  }
                />
                <br />
                <div className="error">{errors.detentionPrice}</div>
              </div>
              <div className="field">
                <input
                  id="allMiles"
                  type="number"
                  placeholder="Miles"
                  value={newLoad.allMiles}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, allMiles: e.target.value })
                  }
                />
                <br />
                <div className="error">{errors.allMiles}</div>
              </div>
              <div className="field">
                <input
                  id="fuelGallons"
                  type="number"
                  placeholder="Fuel"
                  value={newLoad.fuelGallons}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, fuelGallons: e.target.value })
                  }
                />
              </div>
              {/* Add similar input fields for the other columns */}
              <button onClick={handleNewLoadSubmit}>Add</button>
            </div>
          </form>
        )}
      </div>

      <div>
        <p></p>
        <div className="table-container">
          <table className="load-details-table">
            {/* The table headers */}
            <thead>
              <tr>
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
              </tr>
            </thead>
            {/* The table body */}
            <tbody>
              {sortedData.map((load, index) => (
                <tr key={index}>
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
                        <PencilIcon className="w-6 mr-2 ml-1 mb-1 cursor-pointer" onClick={() => handleSaveClick(index)} />
                        <TrashIcon className="w-6 mb-1 cursor-pointer" onClick={() => handleDeleteClick(index)} />
                      </div>
                    ) : (
                      <div className="relative flex items-center">
                        <PencilIcon className="w-6 mr-2 ml-1 mb-1 cursor-pointer" onClick={() => handleEditClick(index)} />
                        <TrashIcon className="w-6 mb-1 cursor-pointer" onClick={() => handleDeleteClick(index)} />
                      </div>
                    )}
                    <InvoiceGenerator loadDetails={[loadDetails[index]]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
