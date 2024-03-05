import React, { useState, useEffect } from "react";
import { Button, Divider, TextInput } from "@tremor/react";
import { fetchTrucks, fetchTrailers } from "../Overview/OverviewUtils";
import { RepairDetail } from "../Types/types";
import { CreateNewRepair } from "../../routes/repairDetails";
import TrailerDropdown from "../TrailerForm/TrailerDropdown";
import TruckDropdown from "../TruckForm/TruckDropdown";
interface RepairsFormProps {
  onSubmitRepair: (repairDetail: RepairDetail) => void;
}

export default function RepairsForm({ onSubmitRepair }: RepairsFormProps) {
  const [repairDetail, setRepairDetail] = useState<Partial<RepairDetail>>({
    repair: "",
    truckObject: "",
    trailerObject: "",
    repairDate: "",
    repairCost: "",
    repairComments: "",
  });

  const [trucks, setTrucks] = useState<string[]>([]);
  const [trailers, setTrailers] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRepairDetail((prevDetail) => ({ ...prevDetail, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Creating new repair", repairDetail);
    const newRepair = await CreateNewRepair(repairDetail as RepairDetail);

    if (newRepair) {
      onSubmitRepair(newRepair);

      setRepairDetail({
        repair: "",
        truckObject: "",
        trailerObject: "",
        repairDate: "",
        repairCost: "",
        repairComments: "",
      });
    }
  };

  useEffect(() => {
    const fetchAndSetTrailers = async () => {
      const fetchedTrailers = await fetchTrailers();
      setTrailers(fetchedTrailers);
    };

    const fetchAndSetTrucks = async () => {
      const fetchedTrucks = await fetchTrucks();
      setTrucks(fetchedTrucks);
    };

    fetchAndSetTrailers();
    fetchAndSetTrucks();
  }, []);

  const handleTruckSelect = (selectedTruck: string) => {
    setRepairDetail({ ...repairDetail, truckObject: selectedTruck });
  };

  const handleTrailerSelect = (selectedTrailer: string) => {
    setRepairDetail({ ...repairDetail, trailerObject: selectedTrailer });
  };

  return (
    <form className="repairs-form" onSubmit={handleSubmit}>
      <div className="col-span-full">
        <label
          htmlFor="repair"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Repair Detail
          <span className="text-red-500">*</span>
        </label>
        <TextInput
          placeholder="Repair Detail"
          type="text"
          name="repair"
          value={repairDetail.repair}
          onChange={handleInputChange}
          required
        />
      </div>
      <Divider></Divider>
      <div className="col-span-full">
        <label
          htmlFor="repairCost"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Cost
          <span className="text-red-500">*</span>
        </label>
        <TextInput
          placeholder="Cost"
          type="text"
          name="repairCost"
          value={repairDetail.repairCost}
          onChange={handleInputChange}
          required
        />
      </div>
      <Divider></Divider>
      <label
        htmlFor="repairDate"
        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
      >
        Date
        <span className="text-red-500">*</span>
      </label>
      <div className="col-span-full">
        <input
          id="pickupTime"
          name="repairDate"
          type="datetime-local"
          placeholder="Repair Date"
          value={repairDetail.repairDate}
          onChange={handleInputChange}
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
          selectedTruck={repairDetail.truckObject || ""}
          onSelectTruck={handleTruckSelect}
        />
      </div>

      <Divider></Divider>
      <div className="col-span-full sm:col-span-3">
        <label
          htmlFor="trailerDropdown"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Trailer
          <span className="text-red-500">*</span>
        </label>
        <TrailerDropdown
          trailerList={trailers}
          selectedTrailer={repairDetail.trailerObject || ""}
          onSelectTrailer={handleTrailerSelect}
        />
      </div>
      <Divider></Divider>
      <TextInput
        placeholder="Comments"
        type="text"
        name="repairComments"
        value={repairDetail.repairComments}
        onChange={handleInputChange}
      />

      <Button className="mt-3" type="submit">
        Create
      </Button>
    </form>
  );
}
