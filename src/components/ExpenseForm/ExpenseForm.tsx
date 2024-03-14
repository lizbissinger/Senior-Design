import React, { useState, useEffect } from "react";
import {
  Divider,
  TextInput,
  NumberInput,
  Dialog,
  DialogPanel,
  Select,
  SelectItem,
  SearchSelect,
  SearchSelectItem,
  DatePicker,
} from "@tremor/react";
import GetAllTrucks from "../../routes/truckDetails";
import GetAllDrivers from "../../routes/driverDetails";

interface ExpenseFormProps {
  onAddExpense: (expense: any) => void;
  onEditExpense?: (expense: any) => void;
  onDeleteExpense?: (expense: any) => void;
  editingExpense?: any | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
  editingExpense,
}) => {
  const repair = "Repair";
  const payroll = "Payroll";
  const fuel = "Fuel";
  const [newExpense, setNewExpense] = useState<any>({
    _id: "",
    type: "",
    cost: "",
    date: new Date(),
    truck: "",
    driver: "",
    additionalName: "",
  });
  const [categoryValue, setCategoryValue] = useState<string>();
  const [trucks, setTrucks] = useState<Object[]>([]);
  const [drivers, setDrivers] = useState<Object[]>([]);
  const [isOpenDeleteDialog, setIsDeleteDialogOpen] = useState(false);

  const fetchTrucks = async () => {
    try {
      const truckList = await GetAllTrucks();

      if (truckList) {
        setTrucks(truckList);
      }
    } catch (error) {}
  };

  const fetchDrivers = async () => {
    try {
      const driverList = await GetAllDrivers();

      if (driverList) {
        setDrivers(driverList);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (editingExpense) {
      setCategoryValue(editingExpense.type);
      setNewExpense({ ...newExpense, date: new Date(newExpense.date) });
    }
    fetchTrucks();
    fetchDrivers();
  }, []);

  useEffect(() => {
    if (editingExpense) {
      setNewExpense(editingExpense);
    }
  }, [editingExpense]);

  useEffect(() => {
    if (categoryValue == repair) {
      setNewExpense({ ...newExpense, driver: "" });
    } else if (categoryValue == payroll) {
      setNewExpense({ ...newExpense, additionalName: "", truck: "" });
    } else if (categoryValue == fuel) {
      setNewExpense({ ...newExpense, additionalName: "", driver: "" });
    }
  }, [categoryValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense((prevExpense: any) => ({ ...prevExpense, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExpense) {
      onEditExpense && onEditExpense(newExpense);
    } else {
      onAddExpense(newExpense);
    }
  };

  const handleDelete = () => {
    if (editingExpense) {
      onDeleteExpense && onDeleteExpense(editingExpense);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:max-w-2xl overflow-auto">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {editingExpense ? `Edit ${editingExpense.type}` : "Add Expense"}
        </h3>
        <form onSubmit={handleSubmit}>
          <Divider />
          <div className="col-span-full sm:col-span-3">
            <label
              htmlFor="type"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Select category
              <span className="text-red-500">*</span>
            </label>
            <Select
              id="type"
              name="type"
              value={newExpense.type}
              onValueChange={(newType) => {
                setNewExpense({ ...newExpense, type: newType });
                setCategoryValue(newType);
              }}
              className="mt-2"
              disabled={editingExpense}
              required
            >
              <SelectItem
                value={repair}
                className="cursor-pointer"
              ></SelectItem>
              <SelectItem
                value={payroll}
                className="cursor-pointer"
              ></SelectItem>
              <SelectItem value={fuel} className="cursor-pointer"></SelectItem>
            </Select>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="cost"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Cost
                {!(categoryValue == null) ? (
                  <span className="text-red-500">*</span>
                ) : (
                  ""
                )}
              </label>
              <NumberInput
                name="cost"
                placeholder="Cost"
                value={newExpense.cost}
                onChange={handleInputChange}
                className="mt-2"
                required
                disabled={categoryValue == null}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="additionalName"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Repair Name
                {categoryValue == repair ? (
                  <span className="text-red-500">*</span>
                ) : (
                  ""
                )}
              </label>
              <TextInput
                type="text"
                name="additionalName"
                placeholder="Repair Name"
                value={newExpense.additionalName}
                onChange={handleInputChange}
                className="mt-2"
                disabled={!(categoryValue == repair)}
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="truck"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Truck
                {categoryValue == repair || categoryValue == fuel ? (
                  <span className="text-red-500">*</span>
                ) : (
                  ""
                )}
              </label>
              <SearchSelect
                id="truck"
                name="truck"
                placeholder="Truck"
                value={newExpense.truck}
                onValueChange={(newTruck) => {
                  setNewExpense({ ...newExpense, truck: newTruck });
                }}
                className="mt-2"
                disabled={!(categoryValue == repair || categoryValue == fuel)}
                required
              >
                {trucks.map((truck: any) => (
                  <SearchSelectItem
                    key={truck._id}
                    value={truck.truckNumber}
                    className="cursor-pointer"
                  >
                    {truck.truckNumber}
                  </SearchSelectItem>
                ))}
              </SearchSelect>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="driver"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Driver
                {categoryValue == payroll ? (
                  <span className="text-red-500">*</span>
                ) : (
                  ""
                )}
              </label>
              <SearchSelect
                id="driver"
                name="driver"
                placeholder="Driver"
                value={newExpense.driver}
                onValueChange={(newDriver) => {
                  setNewExpense({ ...newExpense, driver: newDriver });
                }}
                className="mt-2"
                disabled={!(categoryValue == payroll)}
                required
              >
                {drivers.map((driver: any) => (
                  <SearchSelectItem
                    key={driver._id}
                    value={driver.name}
                    className="cursor-pointer"
                  >
                    {driver.name}
                  </SearchSelectItem>
                ))}
              </SearchSelect>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="date"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Date
                <span className="text-red-500">*</span>
              </label>
              <DatePicker
                id="date"
                placeholder="Date"
                value={new Date(newExpense.date)}
                onValueChange={(newDate) =>
                  setNewExpense({ ...newExpense, date: newDate })
                }
                className="mt-2"
                enableClear={false}
              />
            </div>
          </div>
          <Divider />
          <div className={`flex items-center justify-${editingExpense ? `between` : `end`} space-x-4`}>
            {editingExpense ? (
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {e.preventDefault(); setIsDeleteDialogOpen(true)}}
                className="whitespace-nowrap rounded-tremor-default px-4 py-2.5 text-white bg-red-500 font-medium hover:bg-red-700 hover:text-white dark:bg-red-500 dark:text-white dark:tremor-content-strong dark:hover:bg-red-700"
              >
                Delete
              </button>
            ) : null}
            <button
              type="submit"
              className="whitespace-nowrap rounded-tremor-default bg-[#779BFB] px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-[#6686DC] dark:bg-[#6686DC] dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-[#779BFB]"
            >
              {editingExpense ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </form>
        <Dialog
            open={isOpenDeleteDialog}
            onClose={() => {setIsDeleteDialogOpen(false)}}
            static={true}
          >
            <DialogPanel>
              <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Confirm Deletion
              </h3>
              <p>Are you sure you want to delete this expense?</p>
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => {setIsDeleteDialogOpen(false)}}
                  className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-white bg-red-500 font-medium transition duration-300 ease-in-out transform hover:bg-red-700 hover:text-white dark:bg-red-500 dark:text-white dark:tremor-content-strong dark:hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </DialogPanel>
          </Dialog>
      </div>
    </>
  );
};

export default ExpenseForm;
