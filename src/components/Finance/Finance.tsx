import React, { useState } from 'react';
import { Card, Grid, Dialog,Title ,Button, DialogPanel } from "@tremor/react";
import RepairTable from '../Finance-Columns/Repairs-table';
import Example from '../ReapairsForm.tsx/RepairsForm';
import Form from '../ReapairsForm.tsx/RepairsForm';
import { RepairDetail } from '../Types/types';
import RepairsForm from '../ReapairsForm.tsx/RepairsForm';

const Finance: React.FC= () =>{
  const [repairDetails, setRepairDetails] = useState<RepairDetail[]>([]);

  const handleAddRepair = (newRepairDetail: RepairDetail) => {
    // Add the new repair detail to the existing list
    setRepairDetails((prevDetails) => [...prevDetails, newRepairDetail]);
  };

    return(
        <div>
        <h2>Finance</h2>
    
        <Grid numItemsMd={4} numItemsLg={4} className="gap-6 mt-6">
          <Card>
              <Title>Repairs</Title>
              <RepairsForm onSubmitRepair={handleAddRepair}/>
            <RepairTable repairDetails={repairDetails}/>
              
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