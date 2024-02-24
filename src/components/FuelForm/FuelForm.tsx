import React, { useState } from "react";
import { Button, Card, Dialog, DialogPanel, Divider, TextInput, Title ,DatePicker, DatePickerValue } from "@tremor/react";
import { FuelDetail } from "../Types/types";
import { CreateNewFuelLog } from "../../routes/fuelDetails";

interface FuelsFormProps {
    onSubmitFuel: (fuelDetail: FuelDetail) => void;
  }
  
  
  
export default function PayrollForm({ onSubmitFuel }: FuelsFormProps) {
 const [isOpen, setIsOpen] = React.useState(false);
  

const [FuelDetail, setFuelDetail] = useState<Partial<FuelDetail>>({
    truckObject: "",
    gallons: "",
    fuelCost: "",
    fuelDate: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFuelDetail((prevDetail) => ({ ...prevDetail, [name]: value }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   console.log("Creating new FuelLog", FuelDetail);
    const newFuelLog = await CreateNewFuelLog(FuelDetail as FuelDetail);

    if (newFuelLog) {
    
      onSubmitFuel(newFuelLog);
      
      // Clear the form
      setFuelDetail({
        truckObject: "",
        gallons: "",
        fuelDate: "",
        fuelCost: "",
        //loadNumber: ""
      }); 

      // Close the dialog
      setIsOpen(false);
    }
  };


  return (
    <>
      <div className="text-center">
        <Button onClick={() => setIsOpen(true)}>Add Fuel Data</Button>
      </div>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
       
          
    
          <Button variant="light" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          <Title className="mb-3">Add Fuel Form</Title>
          <Divider />
    <form className="fuel-form" onSubmit={handleSubmit}>
    <div className="col-span-full">
      <label
          htmlFor="truckobject"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
         Truck || Add Dropdown Here
          <span className="text-red-500">*</span>
        </label>
    <TextInput
          placeholder="Truck"
          type="text"
          name="truckObject"
          value={FuelDetail.truckObject}
          onChange={handleInputChange}
          required
        />
       </div> 
        <Divider></Divider>
        <div className="col-span-full">
        <label
          htmlFor="gallons"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
         Gallons
          <span className="text-red-500">*</span>
        </label>
    <TextInput
          placeholder="Gallons"
          type="text"
          name="gallons"
          value={FuelDetail.gallons}
          onChange={handleInputChange}
          required
        />
       </div> 
        <Divider></Divider>
        <div className="col-span-full">
        <label
          htmlFor="fuelCost"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Cost
          <span className="text-red-500">*</span>
        </label>
        <TextInput
          placeholder="Cost"
          type="text"
          name="fuelCost"
          value={FuelDetail.fuelCost}
          onChange={handleInputChange}
          required
        />
        </div>
        <Divider></Divider>
        <label
          htmlFor="fuelDate"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Date
          <span className="text-red-500">*</span>
        </label>
        <div className="col-span-full">
        <input 
        id="pickupTime"
        name="fuelDate"
        type="datetime-local"
        placeholder="Fueling Date"
        value={FuelDetail.fuelDate}
        onChange={handleInputChange}
        />
        </div>
      
         <Divider></Divider>
     
  
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