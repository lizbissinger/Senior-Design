import React, { useState } from 'react';
import { Card, Grid, Title } from "@tremor/react";

const Finance: React.FC= () =>{
    return(
        <div>
        <h2>Finance</h2>
    
        <Grid numItemsMd={4} numItemsLg={4} className="gap-6 mt-6">
          <Card>
              <Title>Repairs</Title>
            
              
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