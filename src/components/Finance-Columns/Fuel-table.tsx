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
import { FuelDetail } from '../Types/types';

  interface FuelTableProps {
    fuelDetail: FuelDetail[];
    fetchFuel: () => void;
  }

  const FuelTable: React.FC<FuelTableProps> = ({fuelDetail }) => {
    return (
        <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Truck</TableHeaderCell>
            <TableHeaderCell>Gallons</TableHeaderCell>
            <TableHeaderCell>Cost</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fuelDetail.map((item) => (
            <TableRow key={item.truckObject}>
              <TableCell>{item.truckObject}</TableCell>
              <TableCell>
                {item.gallons}
              </TableCell>
            
            <TableCell>
              {item.fuelCost}
            </TableCell> 
            <TableCell>
              {item.fuelDate} 
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
          }
  
    export default FuelTable;