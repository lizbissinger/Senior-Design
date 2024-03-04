import React, { useEffect, useState } from "react";
import { Card, Grid, Title } from "@tremor/react";
import RepairTable from "../Finance-Columns/Repairs-table";
import { PayrollDetail, RepairDetail, Fuel } from "../Types/types";
import RepairsForm from "../RepairsForm/RepairsForm";
import GetAllRepairs from "../../routes/repairDetails";
import PayrollForm from "../PayrollForm/PayrollForm";
import PayrollTable from "../Finance-Columns/Payroll-table";
import GetAllPayroll from "../../routes/payrollDetails";
import GetAllFuelRows from "../../routes/fuel";
import FuelTable from "../Finance-Columns/Fuel-table";
import FuelForm from "../FuelForm/FuelForm";

const Finance: React.FC = () => {
  const [repairDetails, setRepairDetails] = useState<RepairDetail[]>([]);
  const [payrollDetail, setPayrollDetails] = useState<PayrollDetail[]>([]);
  const [fuel, setFuel] = useState<Fuel[]>([]);

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
      const newRepair = newRepairDetail;

      if (newRepair) {
        setRepairDetails((prevDetails) => [...prevDetails, newRepair]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPayroll = async () => {
    try {
      const payroll = await GetAllPayroll();
      if (payroll) {
        setPayrollDetails(payroll);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPayroll = async (newPayrollDetail: PayrollDetail) => {
    try {
      const newPayroll = newPayrollDetail;

      if (newPayroll) {
        setPayrollDetails((prevDetails) => [...prevDetails, newPayroll]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFuelRows = async () => {
    try {
      const fuel = await GetAllFuelRows();
      if (fuel) {
        setFuel(fuel);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddFuel = async (newFuel: Fuel) => {
    try {
      const newFuelRow = newFuel;

      if (newFuelRow) {
        setFuel((prevDetails) => [...prevDetails, newFuelRow]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRepairs();
    fetchPayroll();
    fetchFuelRows();
  }, []);

  return (
    <div>
      <Grid numItemsMd={4} numItemsLg={4} className="gap-6 mt-6">
        <Card>
          <Title>Repairs</Title>
          <RepairsForm onSubmitRepair={handleAddRepair} />
          <RepairTable
            repairDetails={repairDetails}
            fetchRepairs={fetchRepairs}
          />
        </Card>
        <Card>
          <Title>Payroll</Title>
          <PayrollForm onSubmitPayroll={handleAddPayroll} />
          <PayrollTable
            payrollDetail={payrollDetail}
            fetchPayroll={fetchPayroll}
          />
        </Card>
        <Card>
          <Title>Fuel</Title>
          <FuelForm onSubmitFuel={handleAddFuel} />
          <FuelTable 
            fuel={fuel}
            fetchFuel={fetchFuelRows}
          />
        </Card>
        <Card>
          <Title>Revenue</Title>
        </Card>
      </Grid>
    </div>
  );
};

export default Finance;
