"use client";
import React, { useState } from "react";
import { Button, Card, Dialog, DialogPanel, Divider, TextInput, Title ,DatePicker, DatePickerValue } from "@tremor/react";
import { FloatingLabel } from 'flowbite-react';
import TruckDropdown from "../TruckForm/TruckDropdown";
import { RepairDetail } from "../Types/types";
// const [trucks, setTrucks] = useState<string[]>([]);
interface RepairsFormProps {
    onSubmitRepair: (repairDetail: RepairDetail) => void;
  }
  
  
export default function RepairsForm({ onSubmitRepair }: RepairsFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted");
//     const repairDetail: RepairDetail = {
//         repair: "", 
//         truckObject: "", 
//         trailerObject: "", 
//         repairDate: "", 
//         repairCost: "", 
//         repairComments: "", 
//       };
//       onSubmitRepair(repairDetail);

//   };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRepair(repairDetail as RepairDetail);

    // Clear the form or perform any additional actions as needed
    setRepairDetail({
      repair: "",
      truckObject: "",
      trailerObject: "",
      repairDate: "",
      repairCost: "",
      repairComments: "",
    });
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
    <form className="repairs-form" onSubmit={handleSubmit}>
    <TextInput
          placeholder="Repair Detail"
          type="text"
          name="repair"
          value={repairDetail.repair}
          onChange={handleInputChange}
          required
        />
        <Divider></Divider>
        <TextInput
          placeholder="Cost"
          type="text"
          name="repairCost"
          value={repairDetail.repairCost}
          onChange={handleInputChange}
          required
        />
        <Divider></Divider>
        <DatePicker className="max-w-sm mx-auto"
         value={repairDetail.repairDate ? new Date(repairDetail.repairDate) : undefined}
         onChange={handleInputChange}
         />
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
          name="Comments"
          value={repairDetail.repairComments}
          onChange={handleInputChange}
          />
    {/* <div className="form">
                Use the TruckDropdown component to select a truck
                <TruckDropdown
                  truckList={trucks}
                  selectedTruck={newLoad.truckObject}
                  onSelectTruck={handleTruckSelect}
                />
                <div className="error">{errors.truckObject}</div>
              </div> */}
                
      {/* <input
      id="RepairName"
        type="text"
        name="RepairName"
        placeholder="Repair Name"
      
        required
      />
      <Divider></Divider>
      <input
        type="text"
        name="make"
        placeholder="Make"
      
        required
      />
      <Divider></Divider>
      
      <input
      
        type="text"
        name="model"
        placeholder="Model"
      
        required
      />
     <Divider></Divider> */}
      <Button className= "mt-3" type="submit"  > 
      {/* onClick={() => setIsOpen(false)}     -- To close form on creation*/}
        Create
      </Button>
    </form>
    
       
        </DialogPanel>
      </Dialog>
    </>
  );
}