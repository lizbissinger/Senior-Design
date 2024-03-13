import React, { useEffect, useState } from "react";
import "./Finance.css";
import {
  Card,
  Grid,
  Button,
  Badge,
  Dialog,
  DialogPanel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {
  WrenchIcon,
  FunnelIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { PayrollDetail, RepairDetail, Fuel } from "../Types/types";
import {
  GetAllRepairs,
  CreateNewRepair,
  UpdateRepair,
} from "../../routes/repairDetails";
import {
  GetAllPayroll,
  CreateNewPayroll,
  UpdatePayroll,
} from "../../routes/payrollDetails";
import {
  GetAllFuelRows,
  CreateNewFuelRow,
  UpdateFuel,
} from "../../routes/fuel";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import CloseButton from "react-bootstrap/CloseButton";

const Finance: React.FC = () => {
  const REPAIR = "Repair";
  const PAYROLL = "Payroll";
  const FUEL = "Fuel";
  const [expenseTableData, setExpenseTableData] = useState<Object[]>([]);
  const [isOpenExpenseDialog, setIsOpenExpenseDialog] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);

  const valueFormatter = function (number: number) {
    return "$ " + new Intl.NumberFormat("us").format(number).toString();
  };

  const fetchExpenseData = async () => {
    try {
      let repairs = await GetAllRepairs();
      let payroll = await GetAllPayroll();
      let fuel = await GetAllFuelRows();
      let data: any[] = [];

      if (repairs) {
        repairs.map((repair: any) => {
          data.push({
            _id: repair._id,
            type: REPAIR,
            cost: repair.repairCost,
            truck: repair.truckObject,
            driver: "",
            date: repair.repairDate,
            additionalName: repair.repair,
          });
        });
      }

      if (payroll) {
        payroll.map((payroll: any) => {
          data.push({
            _id: payroll._id,
            type: PAYROLL,
            cost: payroll.payrollCost,
            truck: "",
            driver: payroll.driver,
            date: payroll.payrollDate,
            additionalName: "",
          });
        });
      }

      if (fuel) {
        fuel.map((fuel: any) => {
          data.push({
            _id: fuel._id,
            type: FUEL,
            cost: fuel.cost,
            truck: fuel.truckObject,
            driver: "",
            date: fuel.date,
            additionalName: "",
          });
        });
      }

      setExpenseTableData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExpense = async (expense: any) => {
    expense.date = expense.date.toString();
    try {
      if (expense.type == REPAIR) {
        let repair: RepairDetail = {
          _id: "",
          repair: expense.additionalName,
          truckObject: expense.truck,
          trailerObject: "",
          repairDate: new Date(expense.date).toISOString(),
          repairCost: expense.cost,
          repairComments: "",
        };
        const addedRepair = await CreateNewRepair(repair);
        if (addedRepair) {
          setExpenseTableData((prevData) => [...prevData, expense]);
        }
      } else if (expense.type == PAYROLL) {
        let payroll: PayrollDetail = {
          _id: "",
          driver: expense.driver,
          payrollCost: expense.cost,
          payrollDate: new Date(expense.date).toISOString(),
        };
        const addedPayroll = await CreateNewPayroll(payroll);
        if (addedPayroll) {
          setExpenseTableData((prevData) => [...prevData, expense]);
        }
      } else if (expense.type == FUEL) {
        let fuel: Fuel = {
          _id: "",
          cost: expense.cost,
          truckObject: expense.truck,
          date: new Date(expense.date).toISOString(),
          comments: "",
        };
        const addedFuel = await CreateNewFuelRow(fuel);
        if (addedFuel) {
          setExpenseTableData((prevData) => [...prevData, expense]);
        }
      }
      setIsOpenExpenseDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExpense = async (expense: any) => {
    expense.date = expense.date.toString();
    try {
      if (expense.type == REPAIR) {
        let repair: RepairDetail = {
          _id: expense._id,
          repair: expense.additionalName,
          truckObject: expense.truck,
          trailerObject: "",
          repairDate: new Date(expense.date).toISOString(),
          repairCost: expense.cost,
          repairComments: "",
        };
        const updatedRepair = await UpdateRepair(repair);
        if (updatedRepair) {
          const updatedExpenseTable = expenseTableData.map((e: any) =>
            e._id == updatedRepair._id ? expense : e
          );
          setExpenseTableData(updatedExpenseTable);
        }
      } else if (expense.type == PAYROLL) {
        let payroll: PayrollDetail = {
          _id: expense._id,
          driver: expense.driver,
          payrollCost: expense.cost,
          payrollDate: new Date(expense.date).toISOString(),
        };
        const updatedPayroll = await UpdatePayroll(payroll);
        if (updatedPayroll) {
          const updatedExpenseTable = expenseTableData.map((e: any) =>
            e._id == updatedPayroll._id ? expense : e
          );
          setExpenseTableData(updatedExpenseTable);
        }
      } else if (expense.type == FUEL) {
        let fuel: Fuel = {
          _id: expense._id,
          cost: expense.cost,
          truckObject: expense.truck,
          date: new Date(expense.date).toISOString(),
          comments: "",
        };
        const updatedFuel = await UpdateFuel(fuel);
        if (updatedFuel) {
          const updatedExpenseTable = expenseTableData.map((e: any) =>
            e._id == updatedFuel._id ? expense : e
          );
          setExpenseTableData(updatedExpenseTable);
        }
      }
      setIsOpenExpenseDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExpense = async (expense: any, index: number) => {
    // try {
    //   const deletedTrailer = await DeleteTrailer(trailer._id);
    //   console.log("Trailer deleted:", trailer);
    //   if (deletedTrailer) {
    //     const updatedTrailerDetails = trailerDetails.filter(
    //       (trailer) => trailer._id !== deletedTrailer._id
    //     );
    //     setTrailerDetails(updatedTrailerDetails);
    //     const updatedVehiclesDetails = {
    //       ...vehiclesDetails,
    //       trailers: vehiclesDetails.trailers.filter(
    //         (trailer) => trailer._id !== deletedTrailer._id
    //       ),
    //     };
    //     setVehiclesDetails(updatedVehiclesDetails);
    //   }
    //   setSelectedTrailer(null);
    // } catch (error) {
    //   console.error("Error deleting trailer:", error);
    // }
  };

  const data = [
    {
      workspace: "sales_by_day_api",
      owner: "John Doe",
      status: "Live",
      costs: "$3,509.00",
      region: "US-West 1",
      capacity: "99%",
      lastEdited: "23/09/2023 13:00",
    },
    {
      workspace: "marketing_campaign",
      owner: "Jane Smith",
      status: "Live",
      costs: "$5,720.00",
      region: "US-East 2",
      capacity: "80%",
      lastEdited: "22/09/2023 10:45",
    },
    {
      workspace: "test_environment",
      owner: "David Clark",
      status: "Inactive",
      costs: "$800.00",
      region: "EU-Central 1",
      capacity: "40%",
      lastEdited: "25/09/2023 16:20",
    },
    {
      workspace: "sales_campaign",
      owner: "Jane Smith",
      status: "Live",
      costs: "$5,720.00",
      region: "US-East 2",
      capacity: "80%",
      lastEdited: "22/09/2023 10:45",
    },
    {
      workspace: "development_env",
      owner: "Mike Johnson",
      status: "Inactive",
      costs: "$4,200.00",
      region: "EU-West 1",
      capacity: "60%",
      lastEdited: "21/09/2023 14:30",
    },
    {
      workspace: "new_workspace_1",
      owner: "Alice Brown",
      status: "Inactive",
      costs: "$2,100.00",
      region: "US-West 2",
      capacity: "75%",
      lastEdited: "24/09/2023 09:15",
    },
  ];

  useEffect(() => {
    fetchExpenseData();
  }, []);

  return (
    <div>
      <Grid numItemsLg={2} className="gap-6 mt-6">
        <Card>
          <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
            <div>
              <h3 className="mt-2.5 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Revenue
              </h3>
            </div>
          </div>
          <Table className="mt-11">
            <TableHead className="dark:bg-slate-900">
              <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Workspace
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Owner
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Status
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Region
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Capacity
                </TableHeaderCell>
                <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Costs
                </TableHeaderCell>
                <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Last edited
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.workspace}>
                  <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    {item.workspace}
                  </TableCell>
                  <TableCell>{item.owner}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.region}</TableCell>
                  <TableCell>{item.capacity}</TableCell>
                  <TableCell className="text-right">{item.costs}</TableCell>
                  <TableCell className="text-right">
                    {item.lastEdited}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card className="max-h-svh overflow-auto">
          <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
            <div>
              <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Expenses
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpenExpenseDialog(true)}
              className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-[#779BFB] px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-[#6686DC] dark:bg-[#6686DC] dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-[#779BFB] sm:mt-0 sm:w-fit"
            >
              Add expense
            </button>
          </div>
          <Table className="mt-8">
            <TableHead>
              <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800"></TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Type
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Cost
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Date
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Truck
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Driver
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Repair Name
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseTableData.map((expense: any) => (
                <TableRow key={expense._id}>
                  <TableCell>
                    <Button
                      variant="light"
                      onClick={() => {
                        setEditingExpense(expense);
                        setIsOpenExpenseDialog(true);
                      }}
                      className="edit-button text-[#779BFB] hover:text-[#6686DC] dark:text-[#6686DC] dark:hover:text-[#779BFB]"
                    >
                      <FontAwesomeIcon icon={faPenAlt} /> {/* Edit Icon */}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Badge
                      size="md"
                      className="type-badge rounded align-middle"
                      icon={
                        expense.type == REPAIR
                          ? WrenchIcon
                          : expense.type == PAYROLL
                          ? CurrencyDollarIcon
                          : FunnelIcon
                      }
                      color={
                        expense.type == REPAIR
                          ? "cyan"
                          : expense.type == PAYROLL
                          ? "#6686DC"
                          : "fuchsia"
                      }
                    >
                      {expense.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{valueFormatter(expense.cost)}</TableCell>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{expense.truck}</TableCell>
                  <TableCell>{expense.driver}</TableCell>
                  <TableCell>{expense.additionalName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Dialog
          open={isOpenExpenseDialog}
          onClose={() => setIsOpenExpenseDialog(false)}
          static={true}
        >
          <DialogPanel>
            <CloseButton
              onClick={() => {
                setIsOpenExpenseDialog(false);
                setEditingExpense(null);
              }}
              className="main-button"
            ></CloseButton>
            <ExpenseForm
              onAddExpense={handleAddExpense}
              onEditExpense={handleEditExpense}
              editingExpense={editingExpense}
            />
          </DialogPanel>
        </Dialog>
      </Grid>
    </div>
  );
};

export default Finance;
