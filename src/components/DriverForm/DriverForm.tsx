import React, { useState, useEffect } from "react";
import { DriverDetail } from "../Types/types";
import Button from '@mui/material/Button';

interface DriverFormProps {
  onAddDriver: (driver: DriverDetail) => void;
  onEditDriver?: (driver: DriverDetail) => void;
  editingDriver?: DriverDetail | null;
}

const DriverForm: React.FC<DriverFormProps> = ({
  onAddDriver,
  onEditDriver,
  editingDriver,
}) => {
  const [newDriver, setNewDriver] = useState<DriverDetail>({
    _id: "",
    name: "",
    licenseNumber: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    console.log("editingDriver:", editingDriver);

    if (editingDriver) {
      console.log("Setting newDriver:", editingDriver);
      setNewDriver(editingDriver);
    } else {
      console.log("Resetting newDriver");
      setNewDriver({
        _id: "",
        name: "",
        licenseNumber: "",
        phoneNumber: "",
        email: "",
      });
    }
  }, [editingDriver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDriver((prevDriver) => ({ ...prevDriver, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDriver) {
      onEditDriver && onEditDriver(newDriver);
    } else {
      onAddDriver(newDriver);
    }

    setNewDriver({
      _id: "",
      name: "",
      licenseNumber: "",
      phoneNumber: "",
      email: "",
    });
  };

  return (
    <form className="driver-form" onSubmit={handleSubmit}>
      <div className="field">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newDriver.name}
        onChange={handleInputChange}
        required
      />
      </div>
      <div className="field">
      <input
        type="text"
        name="licenseNumber"
        placeholder="License Number"
        value={newDriver.licenseNumber}
        onChange={handleInputChange}
        required
      />
      </div>
      <div className="field">
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={newDriver.phoneNumber}
        onChange={handleInputChange}
        required
      />
      </div>
      <div className="field">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newDriver.email}
        onChange={handleInputChange}
        required
      />
      </div>
      <Button className= "mt-3" type="submit">
        {editingDriver ? "Update Driver" : "Add Driver"}
      </Button>
    </form>
  );
};

export default DriverForm;
