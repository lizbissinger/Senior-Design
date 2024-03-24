import React, { useEffect, useState } from "react";
import "./Finance.css";
import {
  Card,
  Grid,
  Button,
  Badge,
  DateRangePicker,
  DateRangePickerValue,
  Dialog,
  DialogPanel,
  Select,
  SelectItem,
  SearchSelect,
  SearchSelectItem,
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
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
import {
  PayrollDetail,
  RepairDetail,
  Fuel,
  TruckDetail,
  DriverDetail,
} from "../Types/types";
import {
  GetAllRepairs,
  CreateNewRepair,
  UpdateRepair,
  DeleteRepair,
} from "../../routes/repairDetails";
import {
  GetAllPayroll,
  CreateNewPayroll,
  UpdatePayroll,
  DeletePayroll,
} from "../../routes/payrollDetails";
import {
  GetAllFuelRows,
  CreateNewFuelRow,
  UpdateFuel,
  DeleteFuel,
} from "../../routes/fuel";
import GetAllDrivers from "../../routes/driverDetails";
import GetAllTrucks from "../../routes/truckDetails";
import GetFinanceTabRevenue from "../../routes/finance";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import {
  XMarkIcon,
  UserIcon,
  TruckIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/solid";

const SkeletonLoading = () => (
  <div role="status">
    {[...Array(1)].map((_, index) => (
      <div>
        <div className="animate-pulse h-3.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-full mb-2.5"></div>
      </div>
    ))}
    <span className="sr-only">Loading...</span>
  </div>
);

const Finance: React.FC = () => {
  const REPAIR = "Repair";
  const PAYROLL = "Payroll";
  const FUEL = "Fuel";
  const [allExpenses, setAllExpenses] = useState<Object[]>([]);
  const [expenseTableData, setExpenseTableData] = useState<Object[]>([]);
  const [revenueTableData, setRevenueTableData] = useState<Object[]>([]);
  const [isOpenExpenseDialog, setIsOpenExpenseDialog] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);
  const [driver, setDriver] = useState("");
  const [drivers, setDrivers] = useState<DriverDetail[]>([]);
  const [truck, setTruck] = useState("");
  const [trucks, setTrucks] = useState<TruckDetail[]>([]);
  const [date, setDate] = useState<DateRangePickerValue>();
  const [groupBy, setGroupBy] = useState("Driver");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const valueFormatter = function (number: number) {
    return "$ " + new Intl.NumberFormat("us").format(number).toString();
  };

  const fetchAllDrivers = async () => {
    try {
      const driverList = await GetAllDrivers();

      if (driverList) {
        setDrivers(driverList);
      }
    } catch (error) {}
  };

  const fetchAllTrucks = async () => {
    try {
      const truckList = await GetAllTrucks();

      if (truckList) {
        setTrucks(truckList);
      }
    } catch (error) {}
  };

  const fetchRevenueData = async () => {
    try {
      const revenueData = await GetFinanceTabRevenue(
        groupBy,
        driver,
        truck,
        date
      );

      if (revenueData) {
        if (groupBy == "Driver") {
          revenueData.sort((a: any, b: any) =>
            a.driver > b.driver ? 1 : b.driver > a.driver ? -1 : 0
          );
        } else if (groupBy == "Truck") {
          revenueData.sort((a: any, b: any) =>
            a.truck > b.truck ? 1 : b.truck > a.truck ? -1 : 0
          );
        }
        setRevenueTableData(revenueData);
      }
    } catch (error) {}
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

      setAllExpenses(data);
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
          setAllExpenses((prevData) => [...prevData, expense]);
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
          setAllExpenses((prevData) => [...prevData, expense]);
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
          setAllExpenses((prevData) => [...prevData, expense]);
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
          setAllExpenses(updatedExpenseTable);
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
          setAllExpenses(updatedExpenseTable);
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
          setAllExpenses(updatedExpenseTable);
          setExpenseTableData(updatedExpenseTable);
        }
      }
      setIsOpenExpenseDialog(false);
      await new Promise((r) => setTimeout(r, 200));
      setEditingExpense(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExpense = async (expense: any) => {
    if (expense.type == REPAIR) {
      const deletedRepair = await DeleteRepair(expense._id);
      if (deletedRepair) {
        const updatedExpenseTable = expenseTableData.filter(
          (e: any) => e._id !== deletedRepair._id
        );
        setAllExpenses(updatedExpenseTable);
        setExpenseTableData(updatedExpenseTable);
      }
    } else if (expense.type == PAYROLL) {
      const deletedPayroll = await DeletePayroll(expense._id);
      if (deletedPayroll) {
        const updatedExpenseTable = expenseTableData.filter(
          (e: any) => e._id !== deletedPayroll._id
        );
        setAllExpenses(updatedExpenseTable);
        setExpenseTableData(updatedExpenseTable);
      }
    } else if (expense.type == FUEL) {
      const deletedFuel = await DeleteFuel(expense._id);
      if (deletedFuel) {
        const updatedExpenseTable = expenseTableData.filter(
          (e: any) => e._id !== deletedFuel._id
        );
        setAllExpenses(updatedExpenseTable);
        setExpenseTableData(updatedExpenseTable);
      }
    }
    setIsOpenExpenseDialog(false);
    await new Promise((r) => setTimeout(r, 200));
    setEditingExpense(null);
  };

  useEffect(() => {
    fetchExpenseData();
    fetchAllDrivers();
    fetchAllTrucks();
  }, []);

  useEffect(() => {
    let filteredExpenseTable: any = [];
    let from: Date;
    let to: Date;
    if (date?.from) {
      from = new Date(date.from);
    }
    if (date?.to) {
      to = new Date(date.to);
      to.setHours(23);
      to.setMinutes(59);
    }
    if (truck.length > 0 && driver.length > 0 && date?.from && date?.to) {
      allExpenses.map((e: any) => {
        const _date = new Date(e.date);
        if (
          e.truck == truck &&
          e.driver == driver &&
          _date >= from &&
          _date <= to
        ) {
          filteredExpenseTable.push(e);
        }
      });
      setExpenseTableData(filteredExpenseTable);
    } else if (truck.length > 0 && date?.from && date?.to) {
      allExpenses.map((e: any) => {
        const _date = new Date(e.date);
        if (e.truck == truck && _date >= from && _date <= to) {
          filteredExpenseTable.push(e);
        }
      });
      setExpenseTableData(filteredExpenseTable);
    } else if (truck.length > 0 && driver.length > 0) {
      allExpenses.map((e: any) => {
        if (e.truck == truck && e.driver == driver) {
          filteredExpenseTable.push(e);
        }
      });
      setExpenseTableData(filteredExpenseTable);
    } else if (driver.length > 0 && date?.from && date?.to) {
      allExpenses.map((e: any) => {
        const _date = new Date(e.date);
        if (e.driver == driver && _date >= from && _date <= to) {
          filteredExpenseTable.push(e);
        }
      });
      setExpenseTableData(filteredExpenseTable);
    } else if (date?.from && date?.to) {
      allExpenses.map((e: any) => {
        const _date = new Date(e.date);
        if (_date >= from && _date <= to) {
          filteredExpenseTable.push(e);
        }
      });
      setExpenseTableData(filteredExpenseTable);
    } else if (driver.length > 0) {
      allExpenses.map((e: any) => {
        if (e.driver == driver) {
          filteredExpenseTable.push(e);
        }
      });
      setExpenseTableData(filteredExpenseTable);
    } else if (truck.length > 0) {
      allExpenses.map((e: any) => {
        if (e.truck == truck) {
          filteredExpenseTable.push(e);
        }
      });
      setExpenseTableData(filteredExpenseTable);
    } else {
      setExpenseTableData(allExpenses);
    }
    fetchRevenueData();
  }, [driver, truck, date, groupBy]);

  return (
    <div>
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        <DateRangePicker
          className="DateRangePicker min-w-sm"
          value={date}
          onValueChange={setDate}
        />
        <div className="max-w-sm mx-auto space-y-6">
          <SearchSelect
            value={driver}
            onValueChange={setDriver}
            placeholder="Filter by driver"
            icon={UserIcon}
          >
            {drivers.map((d) => (
              <SearchSelectItem
                className="cursor-pointer"
                key={d._id}
                value={d.name}
                icon={UserIcon}
              />
            ))}
          </SearchSelect>
        </div>
        <div className="max-w-sm mx-auto space-y-6">
          <SearchSelect
            value={truck}
            onValueChange={setTruck}
            placeholder="Filter by truck"
            icon={TruckIcon}
          >
            {trucks.map((t) => (
              <SearchSelectItem
                className="cursor-pointer"
                key={t._id}
                value={t.truckNumber}
                icon={TruckIcon}
              />
            ))}
          </SearchSelect>
        </div>
      </Grid>
      <Grid numItemsLg={2} className="gap-6 mt-6">
        <Card>
          <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
            <div>
              <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Revenue
              </h3>
            </div>
            <div className="mt-4 mb-0.5 max-w-sm space-y-6">
              <Select
                value={groupBy}
                onValueChange={setGroupBy}
                icon={RectangleGroupIcon}
              >
                <SelectItem
                  className="cursor-pointer"
                  value="Driver"
                  icon={UserIcon}
                />
                <SelectItem
                  className="cursor-pointer"
                  value="Truck"
                  icon={TruckIcon}
                />
              </Select>
            </div>
          </div>
          <Table className="mt-8 finance-table">
            <TableHead className="sticky-header dark:bg-slate-900">
              <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Date
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Revenue
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Driver
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Truck
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading &&
                [...Array(8)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={4}>
                      <SkeletonLoading />
                    </TableCell>
                  </TableRow>
                ))}
              {!isLoading &&
                revenueTableData.map((revenue: any) => (
                  <TableRow key={revenue.key}>
                    <TableCell>{revenue.date}</TableCell>
                    <TableCell>{valueFormatter(revenue.revenue)}</TableCell>
                    <TableCell>
                      <Tooltip
                        title={
                          revenue.driverArr?.length > 1
                            ? revenue.driverArr?.sort().toString()
                            : null
                        }
                      >
                        <div>
                          {groupBy === "Driver" ? (
                            <Badge
                              size="md"
                              className="type-badge rounded align-middle"
                              icon={UserIcon}
                              color={"#6686DC"}
                            >
                              {revenue.driver}
                            </Badge>
                          ) : (
                            revenue.driver
                          )}
                        </div>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={
                          revenue.truckArr?.length > 1
                            ? revenue.truckArr?.sort().toString()
                            : null
                        }
                      >
                        <div>
                          {groupBy === "Truck" ? (
                            <Badge
                              size="md"
                              className="type-badge rounded align-middle"
                              icon={TruckIcon}
                              color={"#6686DC"}
                            >
                              {revenue.truck}
                            </Badge>
                          ) : (
                            revenue.truck
                          )}
                        </div>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
        <Card>
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
          <Table className="mt-8 finance-table">
            <TableHead className="sticky-header">
              <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800"></TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
                  Type
                </TableHeaderCell>
                <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong dark:bg-gray-800">
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
              {isLoading &&
                [...Array(8)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={7}>
                      <SkeletonLoading />
                    </TableCell>
                  </TableRow>
                ))}
              {!isLoading &&
                expenseTableData.map((expense: any) => (
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
                            ? "indigo"
                            : "fuchsia"
                        }
                      >
                        {expense.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {valueFormatter(expense.cost)}
                    </TableCell>
                    <TableCell>
                      {new Date(expense.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {expense.truck ? (
                        <FontAwesomeIcon icon={faTruck} />
                      ) : null}
                      {` ${expense.truck}`}
                    </TableCell>
                    <TableCell>
                      {expense.driver ? (
                        <FontAwesomeIcon icon={faUser} />
                      ) : null}
                      {` ${expense.driver}`}
                    </TableCell>
                    <TableCell>{expense.additionalName}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
        <Dialog
          open={isOpenExpenseDialog}
          onClose={async () => {
            setIsOpenExpenseDialog(false);
            await new Promise((r) => setTimeout(r, 200));
            setEditingExpense(null);
          }}
          static={true}
        >
          <DialogPanel>
            <XMarkIcon
              onClick={async () => {
                setIsOpenExpenseDialog(false);
                await new Promise((r) => setTimeout(r, 200));
                setEditingExpense(null);
              }}
              className="main-button dark:text-white cursor-pointer w-7 h-7"
            ></XMarkIcon>
            <ExpenseForm
              onAddExpense={handleAddExpense}
              onEditExpense={handleEditExpense}
              onDeleteExpense={handleDeleteExpense}
              editingExpense={editingExpense}
            />
          </DialogPanel>
        </Dialog>
      </Grid>
    </div>
  );
};

export default Finance;
