import React, { useState, useEffect } from "react";
import { TruckDetail } from "../Types/types";

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
    <form className="truck-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="truckNumber"
        placeholder="Truck Number"
        value={newTruck.truckNumber}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="make"
        placeholder="Make"
        value={newTruck.make}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={newTruck.model}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={newTruck.year}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="vin"
        placeholder="VIN"
        value={newTruck.vin}
        onChange={handleInputChange}
        required
      />
      <button type="submit">
        {editingTruck ? "Update Truck" : "Add Truck"}
      </button>
    </form>
  );
};

export default TruckForm;
