import React, { useEffect, useState } from "react";
import "./Overview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenAlt,
  faTrash,
  faPlus,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import DriverDropdown from "../DriverDropdown/DriverDropdown";
import DriverForm from "../DriverForm/DriverForm";
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

import _ from "lodash"; //Sorting Library

import {
  LoadDetail,
  TruckDetail,
  TrailerDetail,
  DriverDetail,
} from "../Types/types";

const Overview: React.FC = () => {
  const [drivers, setDrivers] = useState<string[]>([]);
  const [trucks, setTrucks] = useState<string[]>([]);
  const [trailers, setTrailers] = useState<string[]>([]);
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

  const handleAddDriver = (driver: string) => {
    setDrivers([...drivers, driver]);
    setNewLoad({ ...newLoad, driverObject: driver });
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

    if (inputValues.pickupTime.length == 0) {
      errorsObj.pickupTime = "Pick-up time is required";
    }

    if (inputValues.deliveryTime.length == 0) {
      errorsObj.deliveryTime = "Delivery time is required";
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
        (load) => load.status === "To Do"
      ).length;

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
  }, [errors]);

  return (
    <div className="overview-container">
      <h2>Overview</h2>
      <div className="status-boxes">
        <div className="status-box to-do">
          <div className="status-title">To Do</div>
          <div className="status-number">{toDoCount}</div>
        </div>
        <div className="status-box in-progress">
          <div className="status-title">In Progress</div>
          <div className="status-number">{inProgressCount}</div>
        </div>
        <div className="status-box completed">
          <div className="status-title">Completed</div>
          <div className="status-number">{completedCount}</div>
        </div>
      </div>
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
              <div className="field">
                <input
                  id="truckObject"
                  type="text"
                  placeholder="Truck #"
                  value={newLoad.truckObject}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, truckObject: e.target.value })
                  }
                />
                <br />
                <div className="error">{errors.truckObject}</div>
              </div>
              <div className="field">
                <input
                  id="trailerObject"
                  type="text"
                  placeholder="Trailer #"
                  value={newLoad.trailerObject}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, trailerObject: e.target.value })
                  }
                />
                <br />
                <div className="error">{errors.trailerObject}</div>
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
                  type="time"
                  placeholder="Pick-Up Time"
                  value={newLoad.pickupTime}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, pickupTime: e.target.value })
                  }
                />
                <br />
                <div className="error">{errors.pickupTime}</div>
              </div>
              <div className="field">
                <input
                  id="deliveryTime"
                  type="time"
                  placeholder="Delivery Time"
                  value={newLoad.deliveryTime}
                  onChange={(e) =>
                    setNewLoad({ ...newLoad, deliveryTime: e.target.value })
                  }
                />
                <br />
                <div className="error">{errors.deliveryTime}</div>
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                      <input
                        className="load-details-table"
                        type="text"
                        value={load.truckObject}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.truckObject = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      load.truckObject
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="text"
                        value={load.trailerObject}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.trailerObject = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      load.trailerObject
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="text"
                        value={load.driverObject}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.driverObject = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      />
                    ) : (
                      load.driverObject
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <input
                        className="load-details-table"
                        type="text"
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
                        type="text"
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
                        type="text"
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
                        type="text"
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
                        type="text"
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
                        type="text"
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
                  <td className={`status-cell ${load.status.toLowerCase()}`}>
                    {editableIndex === index ? (
                      <select
                        className="load-details-table"
                        value={load.status}
                        onChange={(e) => {
                          const updatedLoad = { ...load };
                          updatedLoad.status = e.target.value;
                          setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                          });
                        }}
                      >
                        <option value="Yellow">Enroute to Shipper</option>
                        <option value="Yellow">At Shipper</option>
                        <option value="Yellow">Loaded</option>
                        <option value="Yellow">Enroute to Receiver</option>
                        <option value="Yellow">At Receiver</option>
                        <option value="Red">Shipment Issue</option>
                        <option value="Red">Payment Issue</option>
                        <option value="Green">Delivered</option>
                      </select>
                    ) : (
                      load.status
                    )}
                  </td>
                  <td>
                    {editableIndex === index ? (
                      <div>
                        <button onClick={() => handleSaveClick(index)}>
                          <FontAwesomeIcon icon={faPenAlt} /> {/* Save icon */}
                        </button>
                        <button onClick={() => handleDeleteClick(index)}>
                          <FontAwesomeIcon icon={faTrash} /> {/* Delete icon */}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => handleEditClick(index)}>
                          <FontAwesomeIcon icon={faPenAlt} /> {/* Edit icon */}
                        </button>
                        <button onClick={() => handleDeleteClick(index)}>
                          <FontAwesomeIcon icon={faTrash} /> {/* Delete icon */}
                        </button>
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
