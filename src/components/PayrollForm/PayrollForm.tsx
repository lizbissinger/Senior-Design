import React, { useState } from "react";
import { Button, Card, Dialog, DialogPanel, Divider, TextInput, Title ,DatePicker, DatePickerValue } from "@tremor/react";
import { PayrollDetail } from "../Types/types";
import { CreateNewPayroll } from "../../routes/payrollDetails";

interface PayrollsFormProps {
    onSubmitPayroll: (payrollDetail: PayrollDetail) => void;
  }
  
  
  
export default function PayrollForm({ onSubmitPayroll }: PayrollsFormProps) {
 const [isOpen, setIsOpen] = React.useState(false);
  

const [payrollDetail, setpayrollDetail] = useState<Partial<PayrollDetail>>({
    driver: "",
    payrollDate: "",
    payrollCost: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setpayrollDetail((prevDetail) => ({ ...prevDetail, [name]: value }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   console.log("Creating new Payroll", payrollDetail);
    const newPayroll = await CreateNewPayroll(payrollDetail as PayrollDetail);

    if (newPayroll) {
      // Update the parent component state or perform any other actions as needed
      onSubmitPayroll(newPayroll);
      
      // Clear the form
      setpayrollDetail({
        driver: "",
        payrollDate: "",
        payrollCost: "",
      }); 

      // Close the dialog
      setIsOpen(false);
    }
  };


  return (
    <>
      <div className="text-center">
        <Button onClick={() => setIsOpen(true)}>Add Payroll</Button>
      </div>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
       
          
    
          <Button variant="light" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          <Title className="mb-3">Add Payroll Form</Title>
          <Divider />
    <form className="payroll-form" onSubmit={handleSubmit}>
    <div className="col-span-full">
      <label
          htmlFor="driver"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Driver name - Add Dropdown here
          <span className="text-red-500">*</span>
        </label>
    <TextInput
          placeholder="Driver Name"
          type="text"
          name="driver"
          value={payrollDetail.driver}
          onChange={handleInputChange}
          required
        />
       </div> 
        <Divider></Divider>
        <div className="col-span-full">
        <label
          htmlFor="payrollCost"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Pay
          <span className="text-red-500">*</span>
        </label>
        <TextInput
          placeholder="Cost"
          type="text"
          name="payrollCost"
          value={payrollDetail.payrollCost}
          onChange={handleInputChange}
          required
        />
        </div>
        <Divider></Divider>
        <label
          htmlFor="payrollDate"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Date
          <span className="text-red-500">*</span>
        </label>
        <div className="col-span-full">
        <input 
        id="pickupTime"
        name="payrollDate"
        type="datetime-local"
        placeholder="Payroll Date"
        value={payrollDetail.payrollDate}
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