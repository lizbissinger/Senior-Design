
import React, { useState } from "react";
import { Button, Card, Dialog, DialogPanel, Divider, TextInput, Title ,DatePicker, DatePickerValue } from "@tremor/react";

import TruckDropdown from "../TruckForm/TruckDropdown";
import { RepairDetail } from "../Types/types";
import { CreateNewRepair } from "../../routes/repairDetails";
// const [trucks, setTrucks] = useState<string[]>([]);
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
  const handleDateChangeWrapper: React.FormEventHandler<HTMLDivElement> = (event) => {
    const date = (event.target as HTMLInputElement).valueAsDate;
    handleDateChange(date !== null ? date : undefined);
  };

  const handleDateChange = (date: Date | undefined) => {
    setRepairDetail((prevDetail) => ({ ...prevDetail, repairDate: date?.toISOString() || "" }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   console.log("Creating new repair", repairDetail);
    const newRepair = await CreateNewRepair(repairDetail as RepairDetail);

    if (newRepair) {
      // Update the parent component state or perform any other actions as needed
      onSubmitRepair(newRepair);
      
      // Clear the form
      setRepairDetail({
        repair: "",
        truckObject: "",
        trailerObject: "",
        repairDate: "",
        repairCost: "",
        repairComments: "",
      }); 

      // Close the dialog
      setIsOpen(false);
    }
  };
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmitRepair(repairDetail as RepairDetail);

//     // Clear the form or perform any additional actions as needed
//     setRepairDetail({
//       repair: "",
//       truckObject: "",
//       trailerObject: "",
//       repairDate: "",
//       repairCost: "",
//       repairComments: "",
//     });
//   };

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
         onChange={handleDateChangeWrapper}
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
          name="repairComments"
          value={repairDetail.repairComments}
          onChange={handleInputChange}
          />
  
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