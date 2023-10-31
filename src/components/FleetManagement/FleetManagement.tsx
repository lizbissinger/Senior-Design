import React, { useState } from 'react';
import './fleetManagement.css'; 

const FleetManagement: React.FC = () => {
  const [trucks, setTrucks] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);

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
  };

  const handleTruckChange = (index: number, field: string, value: string) => {
    const updatedTrucks = [...trucks];
    updatedTrucks[index][field] = value;
    setTrucks(updatedTrucks);
  };

  const handleDriverChange = (index: number, field: string, value: string) => {
    const updatedDrivers = [...drivers];
    updatedDrivers[index][field] = value;
    setDrivers(updatedDrivers);
  };

  const deleteTruck = (index: number) => {
    const updatedTrucks = [...trucks];
    updatedTrucks.splice(index, 1);
    setTrucks(updatedTrucks);
  };

  const deleteDriver = (index: number) => {
    const updatedDrivers = [...drivers];
    updatedDrivers.splice(index, 1);
    setDrivers(updatedDrivers);
  };

  return (
    <div className="fleet-management-container">
      <h2>Fleet Management</h2>
      <div className="search-bar">
        {/* Add your search bar component here */}
        <input type="text" placeholder="Search..." />
      </div>
      <div className="tables-container">
        <div className="table">
          <h3>Trucks</h3>
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
                      onChange={(e) => handleTruckChange(index, "truckNumber", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={truck.VIN}
                      onChange={(e) => handleTruckChange(index, "VIN", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={truck.year}
                      onChange={(e) => handleTruckChange(index, "year", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={truck.model}
                      onChange={(e) => handleTruckChange(index, "model", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={truck.make}
                      onChange={(e) => handleTruckChange(index, "make", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={truck.status}
                      onChange={(e) => handleTruckChange(index, "status", e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => deleteTruck(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addTruck}>Add Truck</button>
        </div>
        <div className="table">
          <h3>Drivers</h3>
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
                      onChange={(e) => handleDriverChange(index, "driverNumber", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={driver.name}
                      onChange={(e) => handleDriverChange(index, "name", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={driver.phoneNumber}
                      onChange={(e) => handleDriverChange(index, "phoneNumber", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={driver.email}
                      onChange={(e) => handleDriverChange(index, "email", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={driver.licenseNumber}
                      onChange={(e) => handleDriverChange(index, "licenseNumber", e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => deleteDriver(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addDriver}>Add Driver</button>
        </div>
      </div>
    </div>
  );
};

export default FleetManagement;
