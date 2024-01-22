import React, { useState } from 'react';
import './FleetManagement.css';
import DriverForm from '../Forms/DriversForm';
import TruckForm from '../Forms/TruckForm';
import TrailerForm from '../Forms/TrailerForm';

const FleetManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

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
      case 'driver':
        return <DriverForm onClose={handleFormClose} />;
      case 'truck':
        return <TruckForm onClose={handleFormClose} />;
      case 'trailer':
        return <TrailerForm onClose={handleFormClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="fleet-management-container">
      <h2>Fleet Management</h2>
      <div className="add-button">
        <button onClick={() => handleAddButtonClick('driver')}>Add Driver</button>
        <button onClick={() => handleAddButtonClick('truck')}>Add Truck</button>
        <button onClick={() => handleAddButtonClick('trailer')}>Add Trailer</button>
      </div>

      {showForm && (
        <div className="form-container">
          {renderForm()}
        </div>
      )}

      {/* Display tables for drivers, trucks, and trailers */}
      <div className="table-container">
        <h3>Drivers</h3>
        {/* Display driver table */}
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
