import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  Divider,
  TextInput,
  Title,
} from "@tremor/react";

import { RepairDetail } from "../Types/types";
import { CreateNewRepair } from "../../routes/repairDetails";
interface RepairsFormProps {
  onSubmitRepair: (repairDetail: RepairDetail) => void;
}

export default function RepairsForm({ onSubmitRepair }: RepairsFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [repairDetail, setRepairDetail] = useState<Partial<RepairDetail>>({
    repair: "",
    truckObject: "",
    trailerObject: "",
    repairDate: "",
    repairCost: "",
    repairComments: "",
  });
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

      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <Button onClick={() => setIsOpen(true)}>Add Repair</Button>
      </div>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Button variant="light" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Title className="mb-3">Add Repair Form</Title>
          <Divider />
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
            <TextInput
              placeholder="Select Truck (Make This deopdown)"
              type="text"
              name="truckObject"
              value={repairDetail.truckObject}
              onChange={handleInputChange}
            />
            <Divider></Divider>
            <TextInput
              placeholder="Select Trailer (Make This deopdown)"
              type="text"
              name="trailerObject"
              value={repairDetail.trailerObject}
              onChange={handleInputChange}
            />
            <Divider></Divider>
            <TextInput
              placeholder="Comments"
              type="text"
              name="repairComments"
              value={repairDetail.repairComments}
              onChange={handleInputChange}
            />

            <Button className="mt-3" type="submit">
              {/* onClick={() => setIsOpen(false)}     -- To close form on creation*/}
              Create
            </Button>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}
