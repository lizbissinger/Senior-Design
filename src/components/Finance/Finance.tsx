import React, { useEffect, useState } from "react";
import { Card, Grid, Title, Dialog, DialogPanel } from "@tremor/react";
import { Dropdown } from "react-bootstrap";
import { PayrollDetail, RepairDetail, Fuel } from "../Types/types";
import RepairTable from "../Finance-Columns/Repairs-table";
import RepairsForm from "../RepairsForm/RepairsForm";
import GetAllRepairs from "../../routes/repairDetails";
import PayrollForm from "../PayrollForm/PayrollForm";
import PayrollTable from "../Finance-Columns/Payroll-table";
import GetAllPayroll from "../../routes/payrollDetails";
import GetAllFuelRows from "../../routes/fuel";
import FuelTable from "../Finance-Columns/Fuel-table";
import FuelForm from "../FuelForm/FuelForm";
import CloseButton from "react-bootstrap/CloseButton";

const Finance: React.FC = () => {
  const [repairDetails, setRepairDetails] = useState<RepairDetail[]>([]);
  const [payrollDetail, setPayrollDetails] = useState<PayrollDetail[]>([]);
  const [fuel, setFuel] = useState<Fuel[]>([]);
  const [isOpenRepairDialog, setIsOpenRepairDialog] = useState(false);
  const [isOpenPayrollDialog, setIsOpenPayrollDialog] = useState(false);
  const [isOpenFuelDialog, setIsOpenFuelDialog] = useState(false);

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
      setIsOpenRepairDialog(false);
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
      setIsOpenPayrollDialog(false);
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
      setIsOpenFuelDialog(false);
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
      <Dropdown className="main-button mb-3">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Add
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setIsOpenRepairDialog(true)}>
            Add Repair
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setIsOpenPayrollDialog(true)}>
            Add Payroll
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setIsOpenFuelDialog(true)}>
            Add Fuel
          </Dropdown.Item>
        </Dropdown.Menu>

        <Dialog
          open={isOpenRepairDialog}
          onClose={() => setIsOpenRepairDialog(false)}
          static={true}
        >
          <DialogPanel>
            <CloseButton
              onClick={() => {
                setIsOpenRepairDialog(false);
              }}
              className="main-button"
            ></CloseButton>
            <RepairsForm onSubmitRepair={handleAddRepair} />
          </DialogPanel>
        </Dialog>

        <Dialog
          open={isOpenPayrollDialog}
          onClose={() => setIsOpenPayrollDialog(false)}
          static={true}
        >
          <DialogPanel>
            <CloseButton
              onClick={() => {
                setIsOpenPayrollDialog(false);
              }}
              className="main-button"
            ></CloseButton>
            <PayrollForm onSubmitPayroll={handleAddPayroll} />
          </DialogPanel>
        </Dialog>

        <Dialog
          open={isOpenFuelDialog}
          onClose={() => setIsOpenFuelDialog(false)}
          static={true}
        >
          <DialogPanel>
            <CloseButton
              onClick={() => {
                setIsOpenFuelDialog(false);
              }}
              className="main-button"
            ></CloseButton>
            <FuelForm onSubmitFuel={handleAddFuel} />
          </DialogPanel>
        </Dialog>
      </Dropdown>
      <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
        <Card>
          <Title>Repairs</Title>
          <RepairTable
            repairDetails={repairDetails}
            fetchRepairs={fetchRepairs}
          />
        </Card>
        <Card>
          <Title>Payroll</Title>
          <PayrollTable
            payrollDetail={payrollDetail}
            fetchPayroll={fetchPayroll}
          />
        </Card>
        <Card>
          <Title>Fuel</Title>
          <FuelTable fuel={fuel} fetchFuel={fetchFuelRows} />
        </Card>
        <Card>
          <Title>Revenue</Title>
        </Card>
      </Grid>
    </div>
  );
};

export default Finance;
