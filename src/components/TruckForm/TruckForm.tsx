import React, { useState, useEffect } from "react";
import { TruckDetail } from "../Types/types";
import Button from "@mui/material/Button";
import { Divider, TextInput, NumberInput } from "@tremor/react";

interface TruckFormProps {
  onAddTruck: (truck: TruckDetail) => void;
  onEditTruck?: (truck: TruckDetail) => void;
  editingTruck?: TruckDetail | null;
}

const TruckForm: React.FC<TruckFormProps> = ({
  onAddTruck,
  onEditTruck,
  editingTruck,
}) => {
  const [newTruck, setNewTruck] = useState<TruckDetail>({
    _id: "",
    truckNumber: "",
    make: "",
    model: "",
    year: 0,
    vin: "",
  });

  useEffect(() => {
    if (editingTruck) {
      setNewTruck(editingTruck);
    }
  }, [editingTruck]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTruck((prevTruck) => ({ ...prevTruck, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTruck) {
      onEditTruck && onEditTruck(newTruck);
    } else {
      onAddTruck(newTruck);
    }

    setNewTruck({
      _id: "",
      truckNumber: "",
      make: "",
      model: "",
      year: 0,
      vin: "",
    });
  };

  return (
    <>
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Truck Information
        </h3>
        <form onSubmit={handleSubmit}>
          <Divider />
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="truckNumber"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Truck Number
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                name="truckNumber"
                placeholder="Truck Number"
                value={newTruck.truckNumber}
                onChange={handleInputChange}
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="year"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Year
                <span className="text-red-500">*</span>
              </label>
              <NumberInput
                name="year"
                placeholder="Year"
                value={newTruck.year}
                onChange={handleInputChange}
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="make"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Make
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                name="make"
                placeholder="Make"
                value={newTruck.make}
                onChange={handleInputChange}
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="model"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Model
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                name="model"
                placeholder="Model"
                value={newTruck.model}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="VIN"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                VIN
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                name="vin"
                placeholder="VIN"
                value={newTruck.vin}
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
              className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
            >
              {editingTruck ? "Update Truck" : "Add Truck"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TruckForm;
