import React, { useState, ChangeEvent } from 'react';

// Define the Driver type if not already defined
interface Driver {
  name: string;
  vin: string;
  year: number;
  make: string;
  model: string;
}

// Define the prop types for DriverForm
interface DriverFormProps {
  onClose: () => void;
}

const DriverForm: React.FC<DriverFormProps> = ({ onClose }) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [formData, setFormData] = useState<Driver>({ name: '', vin: '', year: 0, make: '', model: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setDrivers((prevDrivers) => [...prevDrivers, formData]);
    setFormData({ name: '', vin: '', year: 0, make: '', model: '' });
    onClose(); // Call the onClose prop when the form is submitted
  };

  const handleCancel = () => {
    setFormData({ name: '', vin: '', year: 0, make: '', model: '' }); //Do YOU WANT TO CLEAR OR LEAVE IT?
    onClose();
  }

  return (
    <div>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
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

export default DriverForm;
