import React, { useEffect, useState } from 'react';
import { Card, Grid, Dialog,Title ,Button, DialogPanel } from "@tremor/react";
import RepairTable from '../Finance-Columns/Repairs-table';
import Example from '../RepairsForm/RepairsForm';
import Form from '../RepairsForm/RepairsForm';
import { PayrollDetail, RepairDetail } from '../Types/types';
import RepairsForm from '../RepairsForm/RepairsForm';
import GetAllRepairs, { CreateNewRepair } from '../../routes/repairDetails';
import PayrollForm from '../PayrollForm/PayrollForm';
import PayrollTable from '../Finance-Columns/Payroll-table';
import GetAllPayroll from '../../routes/payrollDetails';

const Finance: React.FC= () =>{
  const [repairDetails, setRepairDetails] = useState<RepairDetail[]>([]);
  const [payrollDetail, setPayrollDetails] = useState<PayrollDetail[]>([]);
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

  useEffect(() => {
    fetchRepairs(); fetchPayroll();
  }, []);


    return(
        <div>
        <h2>Finance</h2>
    
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
              
            </Card>
            <Card>
            <Title>Revenue</Title>

            </Card>
        </Grid>
      </div>
    );
}

export default Finance;