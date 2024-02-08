import React, { useEffect, useState } from 'react';
import { Card, Grid, Dialog,Title ,Button, DialogPanel } from "@tremor/react";
import RepairTable from '../Finance-Columns/Repairs-table';
import Example from '../ReapairsForm.tsx/RepairsForm';
import Form from '../ReapairsForm.tsx/RepairsForm';
import { RepairDetail } from '../Types/types';
import RepairsForm from '../ReapairsForm.tsx/RepairsForm';
import GetAllRepairs, { CreateNewRepair } from '../../routes/repairDetails';

const Finance: React.FC= () =>{
  const [repairDetails, setRepairDetails] = useState<RepairDetail[]>([]);

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
      const newRepair = await CreateNewRepair(newRepairDetail);

      if (newRepair) {
        // Add the new repair detail to the existing list
        setRepairDetails((prevDetails) => [...prevDetails, newRepair]);
      }
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    fetchRepairs();
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