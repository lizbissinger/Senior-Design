import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Grid,
  Card,
} from "@tremor/react";
import { LoadDetail } from "../Types/types";

interface IFTAReportProps {
  loadDetails: LoadDetail[];
}

const IFTAReport: React.FC<IFTAReportProps> = ({ loadDetails }) => {
  const extractStateFromAddress = (address: string): string | null => {
    const stateRegex = /\b([A-Za-z]{2})\b/;
    const match = address.match(stateRegex);

    return match ? match[1] : null;
  };

  const calculateIFTAData = () => {
    const iftaData: Record<string, { miles: number; gallons: number }> = {};

    loadDetails.forEach((load) => {
      const state = extractStateFromAddress(load.deliveryLocation);
      const miles = (load.allMiles) || 0;
      const gallons = (load.fuelGallons) || 0;

      if (state && miles && gallons) {
        if (!iftaData[state]) {
          iftaData[state] = { miles: 0, gallons: 0 };
        }

        iftaData[state].miles += miles;
        iftaData[state].gallons += gallons;
      }
    });

    return iftaData;
  };

  const iftaData = calculateIFTAData();

  const tableData = Object.entries(iftaData).map(
    ([state, { miles, gallons }]) => ({
      state,
      miles: miles.toFixed(2),
      gallons: gallons.toFixed(2),
    })
  );

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <th>State</th>
            <th>Miles</th>
            <th>Gallons</th>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <td>{row.state}</td>
              <td>{row.miles}</td>
              <td>{row.gallons}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default IFTAReport;
