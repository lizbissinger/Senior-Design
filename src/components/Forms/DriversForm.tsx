import React, { useState, ChangeEvent } from 'react';
import {DriverDetail } from "../Types/types";


// Define the prop types for DriverForm
interface DriverFormProps {
  onClose: () => void;
}

const DriverForm: React.FC<DriverFormProps> = ({ onClose }) => {
  const [drivers, setDrivers] = useState<DriverDetail[]>([]);
  const [formData, setFormData] = useState<DriverDetail>({ _id: '', name: '', licenseNumber: '', phoneNumber: '', email: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setDrivers((prevDrivers) => [...prevDrivers, formData]);
    setFormData({ _id: '',name: '', licenseNumber: '', phoneNumber: '', email: '' });
    onClose(); // Call the onClose prop when the form is submitted
  };

  const handleCancel = () => {
    setFormData({ _id: '', name: '', licenseNumber: '', phoneNumber: '', email: ''}); //Do YOU WANT TO CLEAR OR LEAVE IT?
    onClose();
  }

  return (
    <div>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      <label>licenseNumber#:</label>
      <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} />
      <label>phoneNumber:</label>
      <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      <label>Make:</label>
      <input type="text" name="email" value={formData.email} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default DriverForm;
