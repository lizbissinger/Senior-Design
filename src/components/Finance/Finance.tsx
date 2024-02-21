import React, { useEffect, useState } from 'react';
import { Card, Grid, Dialog,Title ,Button, DialogPanel } from "@tremor/react";
import RepairTable from '../Finance-Columns/Repairs-table';
import Example from '../RepairsForm/RepairsForm';
import Form from '../RepairsForm/RepairsForm';
import { PayrollDetail, RepairDetail, Fuel } from '../Types/types';
import RepairsForm from '../RepairsForm/RepairsForm';
import GetAllRepairs, { CreateNewRepair } from '../../routes/repairDetails';
import PayrollForm from '../PayrollForm/PayrollForm';
import PayrollTable from '../Finance-Columns/Payroll-table';
import GetAllPayroll from '../../routes/payrollDetails';
import GetAllFuelRows from '../../routes/fuel';
import FuelTable from '../Finance-Columns/Fuel-table';
import FuelForm from '../FuelForm/FuelForm';

const Finance: React.FC= () =>{
  const [repairDetails, setRepairDetails] = useState<RepairDetail[]>([]);
  const [payrollDetail, setPayrollDetails] = useState<PayrollDetail[]>([]);
  const [fuel, setFuel] = useState<Fuel[]>([]);

  // repairs
 const fetchRepairs = async () => {
    try {
      const repairs = await GetAllRepairs();
      if (repairs) {
        setRepairDetails(repairs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRepair = async (newRepairDetail: RepairDetail) => {
    try {
      // Call your backend API to create a new repair
      const newRepair = (newRepairDetail);

      if (newRepair) {
        // Add the new repair detail to the existing list
        setRepairDetails((prevDetails) => [...prevDetails, newRepair]);
      }
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  //-----Payroll---
  const fetchPayroll = async () => {
    try {
      const payroll = await GetAllPayroll();
      if (payroll) {
        setPayrollDetails(payroll);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPayroll = async (newPayrollDetail: PayrollDetail) => {
    try {
      // Call your backend API to create a new repair
      const newPayroll = (newPayrollDetail);

      if (newPayroll) {
        // Add the new repair detail to the existing list
        setPayrollDetails((prevDetails) => [...prevDetails, newPayroll]);
      }
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const fetchFuelRows = async () => {
    try {
      const fuel = await GetAllFuelRows();
      if (fuel) {
        setFuel(fuel);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddForm = async (newFuel: Fuel) => {
    try {
      // Call your backend API to create a new repair
      const newFuelRow = (newFuel);

      if (newFuelRow) {
        // Add the new repair detail to the existing list
        setFuel((prevDetails) => [...prevDetails, newFuelRow]);
      }
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    fetchRepairs();
    fetchPayroll();
    fetchFuelRows();
  }, []);

    return(
      <div>
        <Grid numItemsMd={4} numItemsLg={4} className="gap-6 mt-6">
          <Card>
            <Title>Repairs</Title>
            <RepairsForm onSubmitRepair={handleAddRepair} />
            <RepairTable repairDetails={repairDetails} fetchRepairs={fetchRepairs}/>
          </Card>
          <Card>
            <Title>Payroll</Title>
            <PayrollForm onSubmitPayroll={handleAddPayroll} />
            <PayrollTable payrollDetail={payrollDetail} fetchPayroll={fetchPayroll}/>
          </Card>
          <Card>
            <Title>Fuel</Title>
            <FuelForm onSubmitFuel={handleAddForm} />
            <FuelTable fuel={fuel} fetchFuel={fetchFuelRows}/>
          </Card>
          <Card>
            <Title>Revenue</Title>

          </Card>
        </Grid>
      </div>
    );
}

export default Finance;