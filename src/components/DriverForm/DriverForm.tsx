import React, { useState, useEffect } from "react";
import { DriverDetail } from "../Types/types";
import { Divider, TextInput } from "@tremor/react";

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
    <>
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Driver Information
        </h3>
        <form onSubmit={handleSubmit}>
          <Divider />
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="driverName"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Driver Name
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                name="name"
                placeholder="Name"
                value={newDriver.name}
                onChange={handleInputChange}
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="licenseNumber"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                License Number
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={newDriver.licenseNumber}
                onChange={handleInputChange}
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="phoneNumber"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Phone Number
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={newDriver.phoneNumber}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Email
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="email"
                name="email"
                placeholder="Email"
                value={newDriver.email}
                onChange={handleInputChange}
                className="mt-2"
                required
              />
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-end space-x-4">
            <button
              type="submit"
              className="whitespace-nowrap rounded-tremor-default bg-[#779BFB] px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-[#6686DC] dark:bg-[#6686DC] dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-[#779BFB]"
            >
              {editingDriver ? "Update Driver" : "Add Driver"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DriverForm;
