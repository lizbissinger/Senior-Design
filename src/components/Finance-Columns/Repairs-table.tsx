import React, { useEffect, useState } from 'react';
import { Dialog, DialogPanel } from "@tremor/react";
import {
    Table,
    TableHead,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
  } from "@tremor/react";
import { RepairDetail } from '../Types/types';

import GetAllRepairs,{
  CreateNewRepair,
  DeleteRepair,
} from '../../routes/repairDetails';



interface RepairTableProps {
  repairDetails: RepairDetail[];
}

  const RepairTable: React.FC<RepairTableProps> = ({  }) => {
    const [repairDetails, setRepairDetails] = useState<RepairDetail[]>([]);

    useEffect(() => {

      const fetchRepairs = async () => {
        try{
          const repairs = await GetAllRepairs();
          if(repairs){
            setRepairDetails(repairs);
          }
        } catch (error){
          console.error(error);
        }
      };
      }, []);
  return(
    
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Expense</TableHeaderCell>
          <TableHeaderCell>Cost</TableHeaderCell>
        
        </TableRow>
      </TableHead>
      <TableBody>
        {repairDetails.map((item) => (
          <TableRow key={item.repair}>
            <TableCell>{item.repair}</TableCell>
            <TableCell>
              {item.repairCost}
            </TableCell>
          
           
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
        }

  export default RepairTable;