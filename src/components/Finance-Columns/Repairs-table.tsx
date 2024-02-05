import React, { useState } from 'react';
import {
    Table,
    TableHead,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
  } from "@tremor/react";

  const data= [
    {expense: "Brake Replacemnet",
     cost:"500"},
     {expense:"Oil Change",
     cost:"200"}

  ]
  const RepairTable: React.FC = () => {
  return(
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Expense</TableHeaderCell>
          <TableHeaderCell>Cost</TableHeaderCell>
        
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.expense}>
            <TableCell>{item.expense}</TableCell>
            <TableCell>
              {item.cost}
            </TableCell>
          
           
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
        }

  export default RepairTable;