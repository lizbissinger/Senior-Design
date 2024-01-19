import React, { useState } from "react";
import "./fleetManagement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

// Truck and driver objects
interface Truck {
  truckNumber: string;
  VIN: string;
  year: string;
  model: string;
  make: string;
  status: string;
}

interface Driver {
  driverNumber: string;
  name: string;
  phoneNumber: string;
  email: string;
  licenseNumber: string;
}

const FleetManagement: React.FC = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [truckValidationErrors, setTruckValidationErrors] = useState<
    Partial<Truck>[]
  >([]);
  const [driverValidationErrors, setDriverValidationErrors] = useState<
    Partial<Driver>[]
  >([]);
  const [isValidationEnabled, setIsValidationEnabled] = useState(false);

  const addTruck = () => {
    const newTruck = {
      truckNumber: "",
      VIN: "",
      year: "",
      model: "",
      make: "",
      status: "",
    };
    setTrucks([...trucks, newTruck]);
    setTruckValidationErrors([...truckValidationErrors, {}]);
  };

  const addDriver = () => {
    const newDriver = {
      driverNumber: "",
      name: "",
      phoneNumber: "",
      email: "",
      licenseNumber: "",
    };
    setDrivers([...drivers, newDriver]);
    setDriverValidationErrors([...driverValidationErrors, {}]);
  };

  const validateTruck = (truck: Truck) => {
    const errors: Partial<Truck> = {};
    if (!truck.truckNumber) {
      errors.truckNumber = "Truck number is required.";
    }
    if (!truck.VIN) {
      errors.VIN = "VIN number is required.";
    }
    if (!truck.year) {
      errors.year = "Year is required.";
    }
    if (!truck.model) {
      errors.model = "Model is required.";
    }
    if (!truck.make) {
      errors.make = "Make is required.";
    }
    if (!truck.status) {
      errors.status = "Status is required.";
    }
    return errors;
  };

  const validateDriver = (driver: Driver) => {
    const errors: Partial<Driver> = {};
    if (!driver.driverNumber) {
      errors.driverNumber = "Driver number is required.";
    }
    if (!driver.name) {
      errors.name = "Name is required.";
    }
    if (!driver.phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    }
    if (!driver.email) {
      errors.email = "Email is required.";
    }
    if (!driver.licenseNumber) {
      errors.licenseNumber = "License number is required.";
    }
    return errors;
  };

  const handleTruckChange = (
    index: number,
    field: keyof Truck,
    value: string
  ) => {
    const updatedTrucks = [...trucks];
    updatedTrucks[index][field] = value;
    setTrucks(updatedTrucks);

    if (isValidationEnabled) {
      const errors = validateTruck(updatedTrucks[index]);
      const updatedErrors = [...truckValidationErrors];
      updatedErrors[index] = errors;
      setTruckValidationErrors(updatedErrors);
    }
  };

  const handleDriverChange = (
    index: number,
    field: keyof Driver,
    value: string
  ) => {
    const updatedDrivers = [...drivers];
    updatedDrivers[index][field] = value;
    setDrivers(updatedDrivers);

    if (isValidationEnabled) {
      const errors = validateDriver(updatedDrivers[index]);
      const updatedErrors = [...driverValidationErrors];
      updatedErrors[index] = errors;
      setDriverValidationErrors(updatedErrors);
    }
  };

  const deleteTruck = (index: number) => {
    const updatedTrucks = [...trucks];
    updatedTrucks.splice(index, 1);
    setTrucks(updatedTrucks);

    const updatedErrors = [...truckValidationErrors];
    updatedErrors.splice(index, 1);
    setTruckValidationErrors(updatedErrors);
  };

  const deleteDriver = (index: number) => {
    const updatedDrivers = [...drivers];
    updatedDrivers.splice(index, 1);
    setDrivers(updatedDrivers);

    const updatedErrors = [...driverValidationErrors];
    updatedErrors.splice(index, 1);
    setDriverValidationErrors(updatedErrors);
  };

  const handleValidationClick = () => {
    // Enable validation when the "Enter" button is clicked
    setIsValidationEnabled(true);

    // Validate all fields and update validation errors
    const truckErrors: Partial<Truck>[] = trucks.map(validateTruck);
    const driverErrors: Partial<Driver>[] = drivers.map(validateDriver);

    setTruckValidationErrors(truckErrors);
    setDriverValidationErrors(driverErrors);
  };

  return (
    <div className="fleet-management-container">
      <h2>Fleet Management</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button onClick={handleValidationClick}>Enter</button>
      </div>
      <div className="tables-container">
        <div className="table">
          <h3>
            Trucks
            <button onClick={addTruck} className="add-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </h3>
          <table>
            <thead>
              <tr>
                <th>Truck #</th>
                <th>VIN #</th>
                <th>Year</th>
                <th>Model</th>
                <th>Make</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((truck, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={truck.truckNumber}
                      onChange={(e) =>
                        handleTruckChange(index, "truckNumber", e.target.value)
                      }
                    />
                    <div className="error-message">
                      {truckValidationErrors[index] &&
                        truckValidationErrors[index].truckNumber}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={truck.VIN}
                      onChange={(e) =>
                        handleTruckChange(index, "VIN", e.target.value)
                      }
                    />
                    <div className="error-message">
                      {truckValidationErrors[index] &&
                        truckValidationErrors[index].VIN}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={truck.year}
                      onChange={(e) =>
                        handleTruckChange(index, "year", e.target.value)
                      }
                    />
                    <div className="error-message">
                      {truckValidationErrors[index] &&
                        truckValidationErrors[index].year}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={truck.model}
                      onChange={(e) =>
                        handleTruckChange(index, "model", e.target.value)
                      }
                    />
                    <div className="error-message">
                      {truckValidationErrors[index] &&
                        truckValidationErrors[index].model}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={truck.make}
                      onChange={(e) =>
                        handleTruckChange(index, "make", e.target.value)
                      }
                    />
                    <div className="error-message">
                      {truckValidationErrors[index] &&
                        truckValidationErrors[index].make}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={truck.status}
                      onChange={(e) =>
                        handleTruckChange(index, "status", e.target.value)
                      }
                    />
                    <div className="error-message">
                      {truckValidationErrors[index] &&
                        truckValidationErrors[index].status}
                    </div>
                  </td>
                  <td>
                    <button onClick={() => deleteTruck(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="enter-button"
                      onClick={() => handleValidationClick()}
                    >
                      Enter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table">
          <h3>
            Drivers
            <button onClick={addDriver} className="add-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </h3>
          <table>
            <thead>
              <tr>
                <th>Driver #</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>License #</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={driver.driverNumber}
                      onChange={(e) =>
                        handleDriverChange(
                          index,
                          "driverNumber",
                          e.target.value
                        )
                      }
                    />
                    <div className="error-message">
                      {driverValidationErrors[index] &&
                        driverValidationErrors[index].driverNumber}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={driver.name}
                      onChange={(e) =>
                        handleDriverChange(index, "name", e.target.value)
                      }
                    />
                    <div className="error-message">
                      {driverValidationErrors[index] &&
                        driverValidationErrors[index].name}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={driver.phoneNumber}
                      onChange={(e) =>
                        handleDriverChange(index, "phoneNumber", e.target.value)
                      }
                    />
                    <div className="error-message">
                      {driverValidationErrors[index] &&
                        driverValidationErrors[index].phoneNumber}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={driver.email}
                      onChange={(e) =>
                        handleDriverChange(index, "email", e.target.value)
                      }
                    />
                    <div className="error-message">
                      {driverValidationErrors[index] &&
                        driverValidationErrors[index].email}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={driver.licenseNumber}
                      onChange={(e) =>
                        handleDriverChange(
                          index,
                          "licenseNumber",
                          e.target.value
                        )
                      }
                    />
                    <div className="error-message">
                      {driverValidationErrors[index] &&
                        driverValidationErrors[index].licenseNumber}
                    </div>
                  </td>
                  <td>
                    <button onClick={() => deleteDriver(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="enter-button"
                      onClick={() => handleValidationClick()}
                    >
                      Enter
                    </button>
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

export default FleetManagement;
