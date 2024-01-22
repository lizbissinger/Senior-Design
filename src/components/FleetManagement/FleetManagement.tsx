import React, { useEffect, useState } from "react";
import "./FleetManagement.css";
import DriverForm from "../Forms/DriversForm";
import TruckForm from "../Forms/TruckForm";
import TrailerForm from "../Forms/TrailerForm";
import GetAllDrivers from "../../routes/driverDetails";
import { DriverDetail } from "../../components/Types/types";

const FleetManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [driverDetails, setDriverDetails] = useState<DriverDetail[]>([]);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const allDrivers = await GetAllDrivers();
        setDriverDetails(allDrivers || []);
      } catch (error) {
        console.error("Error fetching driver details:", error);
      }
    };

    fetchDriverDetails();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleAddButtonClick = (option: string) => {
    setSelectedOption(option);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const renderForm = () => {
    // Show different forms based on the selected option
    switch (selectedOption) {
      case "driver":
        return <DriverForm onClose={handleFormClose} />;
      case "truck":
        return <TruckForm onClose={handleFormClose} />;
      case "trailer":
        return <TrailerForm onClose={handleFormClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="fleet-management-container">
      <h2>Fleet Management</h2>
      <div className="add-button">
        <button onClick={() => handleAddButtonClick("driver")}>
          Add Driver
        </button>
        <button onClick={() => handleAddButtonClick("truck")}>Add Truck</button>
        <button onClick={() => handleAddButtonClick("trailer")}>
          Add Trailer
        </button>
      </div>

      {showForm && <div className="form-container">{renderForm()}</div>}

      {/* Display tables for drivers, trucks, and trailers */}
      <div className="table-container">
        <h3>Drivers</h3>
        {driverDetails.length > 0 ? (
          <table className="driver-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>License Number</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {driverDetails.map((driver) => (
                <tr key={driver._id}>
                  <td>{driver.name}</td>
                  <td>{driver.licenseNumber}</td>
                  <td>{driver.phoneNumber}</td>
                  <td>{driver.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No drivers available.</p>
        )}
      </div>

      <div className="table-container">
        <h3>Trucks</h3>
        {/* Display truck table */}
      </div>

      <div className="table-container">
        <h3>Trailers</h3>
        {/* Display trailer table */}
      </div>
    </div>
  );
};

export default FleetManagement;

// const fetchAllLoads = async () => {
//   let allDrivers: any = null;
//   allDrivers = await GetAllDrivers();
//   if (allDrivers) {
//     let loadsArr: DriverDetail[] = [];
//     if (Array.isArray(allDrivers)) {
//       allDrivers.forEach((element) => {
//         let load: DriverDetail = JSON.parse(JSON.stringify(element));
//         loadsArr.push(load);
//       });
//     }
//     setLoadDetails(loadsArr);
//   }
// }
