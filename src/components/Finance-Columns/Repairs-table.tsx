import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@tremor/react";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";
import { RepairDetail } from "../Types/types";

import GetAllRepairs, {
  CreateNewRepair,
  DeleteRepair,
} from "../../routes/repairDetails";

interface RepairTableProps {
  repairDetails: RepairDetail[];
  fetchRepairs: () => void;
}

const RepairTable: React.FC<RepairTableProps> = ({
  repairDetails,
  fetchRepairs,
}) => {
  return (
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Expense</TableHeaderCell>
          <TableHeaderCell>Cost</TableHeaderCell>
          <TableHeaderCell>Truck</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {repairDetails.map((item) => (
          <TableRow key={item.repair}>
            <TableCell>{item.repair}</TableCell>
            <TableCell>{item.repairCost}</TableCell>
            <TableCell>{item.truckObject}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RepairTable;
