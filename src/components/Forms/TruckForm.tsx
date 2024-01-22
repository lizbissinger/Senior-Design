import React, { useState, ChangeEvent } from 'react';
import {Truck } from "../Types/types";

// Define the prop types for TruckForm
interface TruckFormProps {
  onClose: () => void;
}

const TruckForm: React.FC<TruckFormProps> = ({ onClose }) => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [formData, setFormData] = useState<Truck>({ _id: '', truckNumber: '', vin: '', year: 0, make: '', model: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setTrucks((prevTrucks) => [...prevTrucks, formData]);
    setFormData({ _id: '', truckNumber: '', vin: '', year: 0, make: '', model: '' });
    onClose(); // Call the onClose prop when the form is submitted
  };

  const handleCancel = () => {
    setFormData({ _id: '', truckNumber: '', vin: '', year: 0, make: '', model: '' });
    onClose(); // Call the onClose prop when the form is canceled
  };

  return (
    <div>
      <label>Name:</label>
      <input type="text" name="name" value={formData.truckNumber} onChange={handleChange} />
      <label>VIN#:</label>
      <input type="text" name="vin" value={formData.vin} onChange={handleChange} />
      <label>Year:</label>
      <input type="number" name="year" value={formData.year} onChange={handleChange} />
      <label>Make:</label>
      <input type="text" name="make" value={formData.make} onChange={handleChange} />
      <label>Model:</label>
      <input type="text" name="model" value={formData.model} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default TruckForm;
