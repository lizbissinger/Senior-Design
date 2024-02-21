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
import { Fuel } from '../Types/types';

  interface FuelTableProps {
    fuel: Fuel[];
    fetchFuel: () => void;
  }

  const FuelTable: React.FC<FuelTableProps> = ({ fuel }) => {
    return (
        <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Truck</TableHeaderCell>
            <TableHeaderCell>Cost</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fuel.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.truckObject}</TableCell>
              <TableCell>
                {item.cost}
              </TableCell>
            <TableCell>
              {item.date.substring(0,10)}
            </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
}
  
    export default FuelTable;