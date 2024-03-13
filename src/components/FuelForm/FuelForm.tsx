import React, { useState, useEffect } from "react";
import { Button, Divider, TextInput } from "@tremor/react";
import { Fuel } from "../Types/types";
import { CreateNewFuelRow } from "../../routes/fuel";
import TruckDropdown from "../TruckForm/TruckDropdown";
import { fetchTrucks } from "../Overview/OverviewUtils";

interface FuelFormProps {
  onSubmitFuel: (fuel: Fuel) => void;
}

export default function FuelForm({ onSubmitFuel }: FuelFormProps) {
  const [fuel, setFuel] = useState<Partial<Fuel>>({
    cost: "",
    truckObject: "",
    date: "",
  });

  const [trucks, setTrucks] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFuel((prevDetail) => ({ ...prevDetail, [name]: value }));
  };

  useEffect(() => {
    fetchAndSetTrucks();
  }, []);

  const fetchAndSetTrucks = async () => {
    const fetchedTrucks = await fetchTrucks();
    setTrucks(fetchedTrucks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Creating new Fuel", fuel);
    const newFuelRow = await CreateNewFuelRow(fuel as Fuel);

    if (newFuelRow) {
      // Update the parent component state or perform any other actions as needed
      onSubmitFuel(newFuelRow);

      // Clear the form - commenting this out fixed the bug of showing add af
      // setFuel({
      //   cost: "",
      //   truckObject: "",
      //   date: "",
      // });
    }
  };

  const handleTruckSelect = (selectedTruck: string) => {
    setFuel({ ...fuel, truckObject: selectedTruck });
  };

  return (
    <form className="fuel-form" onSubmit={handleSubmit}>
      <div className="col-span-full">
        <label
          htmlFor="driver"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Cost
          <span className="text-red-500">*</span>
        </label>
        <TextInput
          placeholder="Cost"
          type="text"
          name="cost"
          value={fuel.cost}
          onChange={handleInputChange}
          required
        />
      </div>
      <Divider></Divider>
      <div className="col-span-full sm:col-span-3">
        <label
          htmlFor="truckDropdown"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Truck
          <span className="text-red-500">*</span>
        </label>
        <TruckDropdown
          truckList={trucks}
          selectedTruck={fuel.truckObject || ""}
          onSelectTruck={handleTruckSelect}
        />
      </div>
      <Divider></Divider>
      <label
        htmlFor="date"
        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
      >
        Date
        <span className="text-red-500">*</span>
      </label>
      <div className="col-span-full">
        <input
          id="date"
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={fuel.date}
          onChange={handleInputChange}
        />
      </div>
      <Divider></Divider>
      <Button className="mt-3" type="submit">
        {/* onClick={() => setIsOpen(false)}     -- To close form on creation*/}
        Create
      </Button>
    </form>
  );
}