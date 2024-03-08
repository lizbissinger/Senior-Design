import React, { useState, useEffect } from "react";
import { TrailerDetail } from "../Types/types";
import Button from "@mui/material/Button";
import { Divider, TextInput, NumberInput } from "@tremor/react";

interface TrailerFormProps {
  onAddTrailer: (trailer: TrailerDetail) => void;
  onEditTrailer?: (trailer: TrailerDetail) => void;
  editingTrailer?: TrailerDetail | null;
}

const TrailerForm: React.FC<TrailerFormProps> = ({
  onAddTrailer,
  onEditTrailer,
  editingTrailer,
}) => {
  const [newTrailer, setNewTrailer] = useState<TrailerDetail>({
    _id: "",
    trailerNumber: "",
    make: "",
    model: "",
    year: 0,
    vin: "",
  });

  useEffect(() => {
    if (editingTrailer) {
      setNewTrailer(editingTrailer);
    }
  }, [editingTrailer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTrailer((prevTrailer) => ({ ...prevTrailer, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTrailer) {
      onEditTrailer && onEditTrailer(newTrailer);
    } else {
      onAddTrailer(newTrailer);
    }

    setNewTrailer({
      _id: "",
      trailerNumber: "",
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
          Trailer Information
        </h3>
        <form onSubmit={handleSubmit}>
          <Divider />
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="trailerNumber"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Trailer Number
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                name="trailerNumber"
                placeholder="Trailer Number"
                value={newTrailer.trailerNumber}
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
                value={newTrailer.year}
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
                value={newTrailer.make}
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
                value={newTrailer.model}
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
                value={newTrailer.vin}
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
              {editingTrailer ? "Update Trailer" : "Add Trailer"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TrailerForm;
