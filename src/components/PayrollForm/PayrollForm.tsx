import React, { useState } from "react";
import { Button, Divider, TextInput } from "@tremor/react";
import { PayrollDetail } from "../Types/types";
import { CreateNewPayroll } from "../../routes/payrollDetails";

interface PayrollsFormProps {
  onSubmitPayroll: (payrollDetail: PayrollDetail) => void;
}

export default function PayrollForm({ onSubmitPayroll }: PayrollsFormProps) {
  const [payrollDetail, setPayrollDetail] = useState<Partial<PayrollDetail>>({
    driver: "",
    payrollDate: "",
    payrollCost: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayrollDetail((prevDetail) => ({ ...prevDetail, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Creating new Payroll", payrollDetail);
    const newPayroll = await CreateNewPayroll(payrollDetail as PayrollDetail);

    if (newPayroll) {
      onSubmitPayroll(newPayroll);

      setPayrollDetail({
        driver: "",
        payrollDate: "",
        payrollCost: "",
      });
    }
  };

  return (
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

      <Button className="mt-3" type="submit">
        {/* onClick={() => setIsOpen(false)}     -- To close form on creation*/}
        Create
      </Button>
    </form>
  );
}
