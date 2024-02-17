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
import { PayrollDetail } from '../Types/types';

  interface PayrollTableProps {
    payrollDetail: PayrollDetail[];
    fetchPayroll: () => void;
  }

  const PayrollTable: React.FC<PayrollTableProps> = ({payrollDetail }) => {
    return (
        <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Driver</TableHeaderCell>
            <TableHeaderCell>Pay</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payrollDetail.map((item) => (
            <TableRow key={item.driver}>
              <TableCell>{item.driver}</TableCell>
              <TableCell>
                {item.payrollCost}
              </TableCell>
            <TableCell>
              {item.payrollDate.substring(0,10)}
            </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
          }
  
    export default PayrollTable;