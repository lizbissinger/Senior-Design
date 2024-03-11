import React, { useEffect, useState } from "react";
import "./FleetManagement.css";
import { AddDriverForm, EditDriverForm } from "../DriverForm/DriverForm";
import { EditTruckForm } from "../TruckForm/TruckForm";
import { AddTrailerForm, EditTrailerForm } from "../TrailerForm/TrailerForm";
import VehiclesDetailsTable from "../VehiclesDetailsTable/VehiclesDetailsTable";
import {
  DriverDetail,
  TruckDetail,
  TrailerDetail,
  VehiclesDetailsTableProps,
} from "../Types/types";
import GetAllDrivers, {
  CreateNewDriver,
  DeleteDriver,
  UpdateDriver,
} from "../../routes/driverDetails";
import GetAllTrailers, {
  CreateNewTrailer,
  DeleteTrailer,
  UpdateTrailer,
} from "../../routes/trailerDetails";
import GetAllTrucks, {
  CreateNewTruck,
  DeleteTruck,
  UpdateTruck,
} from "../../routes/truckDetails";
import { Dialog, DialogPanel } from "@tremor/react";
import { Dropdown } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";

const FleetManagement: React.FC = () => {
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [showTruckForm, setShowTruckForm] = useState(false);
  const [showTrailerForm, setShowTrailerForm] = useState(false);

  const [drivers, setDrivers] = useState<DriverDetail[]>([]);
  const [trucks, setTrucks] = useState<TruckDetail[]>([]);
  const [trailers, setTrailers] = useState<TrailerDetail[]>([]);
  const [driverDetails, setDriverDetails] = useState<DriverDetail[]>([]);
  const [trailerDetails, setTrailerDetails] = useState<TrailerDetail[]>([]);
  const [truckDetails, setTruckDetails] = useState<TruckDetail[]>([]);

  const [vehiclesDetails, setVehiclesDetails] =
    useState<VehiclesDetailsTableProps>({
      drivers: [],
      trucks: [],
      trailers: [],
    });

  const [selectedDriver, setSelectedDriver] = useState<DriverDetail | null>(
    null
  );
  const [selectedTruck, setSelectedTruck] = useState<TruckDetail | null>(null);
  const [selectedTrailer, setSelectedTrailer] = useState<TrailerDetail | null>(
    null
  );

  const [isEditingDriver, setIsEditingDriver] = useState(false);
  const [isEditingTruck, setIsEditingTruck] = useState(false);
  const [isEditingTrailer, setIsEditingTrailer] = useState(false);

  const [editedDriver, setEditedDriver] = useState<DriverDetail | null>(null);
  const [editedTruck, setEditedTruck] = useState<TruckDetail | null>(null);
  const [editedTrailer, setEditedTrailer] = useState<TrailerDetail | null>(
    null
  );

  const [isOpenAddDriverDialog, setIsOpenAddDriverDialog] = useState(false);
  const [isOpenAddTruckDialog, setIsOpenAddTruckDialog] = useState(false);
  const [isOpenAddTrailerDialog, setIsOpenAddTrailerDialog] = useState(false);

  const [isOpenEditDriverDialog, setIsOpenEditDriverDialog] = useState(false);
  const [isOpenEditTruckDialog, setIsOpenEditTruckDialog] = useState(false);
  const [isOpenEditTrailerDialog, setIsOpenEditTrailerDialog] = useState(false);

  useEffect(() => {
    setIsOpenEditDriverDialog(false);
    setIsOpenEditTruckDialog(false);
    setIsOpenEditTrailerDialog(false);
    setIsOpenAddDriverDialog(false);
    setIsOpenAddTruckDialog(false);
    setIsOpenAddTrailerDialog(false);
  }, []);

  const fetchDriverDetails = async () => {
    try {
      const allDrivers = await GetAllDrivers();
      console.log("Fetched Drivers:", allDrivers);
      setDriverDetails(allDrivers || []);
      setVehiclesDetails((prevDetails) => ({
        ...prevDetails,
        drivers: allDrivers || [],
      }));
    } catch (error) {
      console.error("Error fetching driver details:", error);
    }
  };

  const fetchTrailerDetails = async () => {
    try {
      const allTrailers = await GetAllTrailers();
      console.log("Fetched Trailers:", allTrailers);
      setTrailerDetails(allTrailers || []);
      setVehiclesDetails((prevDetails) => ({
        ...prevDetails,
        trailers: allTrailers || [],
      }));
    } catch (error) {
      console.error("Error fetching trailer details:", error);
    }
  };

  const fetchTruckDetails = async () => {
    try {
      const allTrucks = await GetAllTrucks();
      console.log("Fetched Trucks:", allTrucks);
      setTruckDetails(allTrucks || []);
      setVehiclesDetails((prevDetails) => ({
        ...prevDetails,
        trucks: allTrucks || [],
      }));
    } catch (error) {
      console.error("Error fetching truck details:", error);
    }
  };

  useEffect(() => {
    fetchDriverDetails();
    fetchTrailerDetails();
    fetchTruckDetails();
  }, []);

  const handleAddDriver = async (driver: DriverDetail) => {
    const addedDriver = await CreateNewDriver(driver);
    if (addedDriver) {
      console.log("Driver added:", addedDriver);
      setDriverDetails((prevDrivers) => [...prevDrivers, addedDriver]);
      setVehiclesDetails((prevDetails) => ({
        ...prevDetails,
        drivers: [...prevDetails.drivers, addedDriver],
      }));
    }
    setShowDriverForm(false);
    setIsOpenAddDriverDialog(false);
  };

  const handleAddTruck = async (truck: TruckDetail) => {
    const addedTruck = await CreateNewTruck(truck);
    if (addedTruck) {
      console.log("Truck added:", addedTruck);
      setTruckDetails((prevTrucks) => [...prevTrucks, addedTruck]);
      setVehiclesDetails((prevDetails) => ({
        ...prevDetails,
        trucks: [...prevDetails.trucks, addedTruck],
      }));
    }
    setShowTruckForm(false);
    setIsOpenAddTruckDialog(false);
  };

  const handleAddTrailer = async (trailer: TrailerDetail) => {
    const addedTrailer = await CreateNewTrailer(trailer);
    if (addedTrailer) {
      console.log("Trailer added:", addedTrailer);
      setTrailerDetails((prevTrailers) => [...prevTrailers, addedTrailer]);
      setVehiclesDetails((prevDetails) => ({
        ...prevDetails,
        trailers: [...prevDetails.trailers, addedTrailer],
      }));
    }
    setShowTrailerForm(false);
    setIsOpenAddTrailerDialog(false);
  };

  const handleDeleteDriver = async (driver: DriverDetail, index: number) => {
    try {
      const deletedDriver = await DeleteDriver(driver._id);
      console.log("Driver deleted:", driver);

      if (deletedDriver) {
        const updatedDriverDetails = driverDetails.filter(
          (driver) => driver._id !== deletedDriver._id
        );
        setDriverDetails(updatedDriverDetails);
        const updatedVehiclesDetails = {
          ...vehiclesDetails,
          drivers: vehiclesDetails.drivers.filter(
            (driver) => driver._id !== deletedDriver._id
          ),
        };
        setVehiclesDetails(updatedVehiclesDetails);
      }

      setSelectedDriver(null);
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const handleDeleteTruck = async (truck: TruckDetail, index: number) => {
    try {
      const deletedTruck = await DeleteTruck(truck._id);
      console.log("Truck deleted:", truck);

      if (deletedTruck) {
        const updatedTruckDetails = truckDetails.filter(
          (truck) => truck._id !== deletedTruck._id
        );
        setTruckDetails(updatedTruckDetails);
        const updatedVehiclesDetails = {
          ...vehiclesDetails,
          trucks: vehiclesDetails.trucks.filter(
            (truck) => truck._id !== deletedTruck._id
          ),
        };
        setVehiclesDetails(updatedVehiclesDetails);
      }

      setSelectedTruck(null);
    } catch (error) {
      console.error("Error deleting truck:", error);
    }
  };

  const handleDeleteTrailer = async (trailer: TrailerDetail, index: number) => {
    try {
      const deletedTrailer = await DeleteTrailer(trailer._id);
      console.log("Trailer deleted:", trailer);

      if (deletedTrailer) {
        const updatedTrailerDetails = trailerDetails.filter(
          (trailer) => trailer._id !== deletedTrailer._id
        );
        setTrailerDetails(updatedTrailerDetails);
        const updatedVehiclesDetails = {
          ...vehiclesDetails,
          trailers: vehiclesDetails.trailers.filter(
            (trailer) => trailer._id !== deletedTrailer._id
          ),
        };
        setVehiclesDetails(updatedVehiclesDetails);
      }

      setSelectedTrailer(null);
    } catch (error) {
      console.error("Error deleting trailer:", error);
    }
  };

  const handleEdit = (
    type: string,
    item: DriverDetail | TruckDetail | TrailerDetail
  ) => {
    switch (type) {
      case "driver":
        setSelectedDriver(item as DriverDetail);
        setEditedDriver(item as DriverDetail);
        setShowDriverForm(false);
        setShowTruckForm(false);
        setShowTrailerForm(false);
        setIsOpenEditDriverDialog(true);
        break;
      case "truck":
        setSelectedTruck(item as TruckDetail);
        setEditedTruck(item as TruckDetail);
        setShowDriverForm(false);
        setShowTruckForm(true);
        setShowTrailerForm(false);
        setIsOpenEditTruckDialog(true);
        break;
      case "trailer":
        setSelectedTrailer(item as TrailerDetail);
        setEditedTrailer(item as TrailerDetail);
        setShowDriverForm(false);
        setShowTruckForm(false);
        setShowTrailerForm(true);
        setIsOpenEditTrailerDialog(true);
        break;
      default:
        break;
    }
  };

  const handleEditDriver = async (editedDriver: DriverDetail) => {
    try {
      const updatedDriver = await UpdateDriver(editedDriver);

      if (updatedDriver) {
        const updatedDriverDetails = driverDetails.map((driver) =>
          driver._id === updatedDriver._id ? updatedDriver : driver
        );
        setDriverDetails(updatedDriverDetails);

        const updatedVehiclesDetails = {
          ...vehiclesDetails,
          drivers: vehiclesDetails.drivers.map((driver) =>
            driver._id === updatedDriver._id ? updatedDriver : driver
          ),
        };
        setVehiclesDetails(updatedVehiclesDetails);
      }

      setShowDriverForm(false);
      setIsOpenEditDriverDialog(false);
      setEditedDriver(null);
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  const handleEditTruck = async (editedTruck: TruckDetail) => {
    try {
      const updatedTruck = await UpdateTruck(editedTruck);

      if (updatedTruck) {
        const updatedTruckDetails = truckDetails.map((truck) =>
          truck._id === updatedTruck._id ? updatedTruck : truck
        );
        setTruckDetails(updatedTruckDetails);

        const updatedVehiclesDetails = {
          ...vehiclesDetails,
          trucks: vehiclesDetails.trucks.map((truck) =>
            truck._id === updatedTruck._id ? updatedTruck : truck
          ),
        };
        setVehiclesDetails(updatedVehiclesDetails);
      }

      setShowTruckForm(false);
      setIsOpenEditTruckDialog(false);
      setEditedTruck(null);
    } catch (error) {
      console.error("Error updating truck:", error);
    }
  };

  const handleEditTrailer = async (editedTrailer: TrailerDetail) => {
    try {
      const updatedTrailer = await UpdateTrailer(editedTrailer);

      if (updatedTrailer) {
        const updatedTrailerDetails = trailerDetails.map((trailer) =>
          trailer._id === updatedTrailer._id ? updatedTrailer : trailer
        );
        setTrailerDetails(updatedTrailerDetails);

        const updatedVehiclesDetails = {
          ...vehiclesDetails,
          trailers: vehiclesDetails.trailers.map((trailer) =>
            trailer._id === updatedTrailer._id ? updatedTrailer : trailer
          ),
        };
        setVehiclesDetails(updatedVehiclesDetails);
      }

      setShowTrailerForm(false);
      setIsOpenEditTrailerDialog(false);
      setEditedTrailer(null);
    } catch (error) {
      console.error("Error updating trailer:", error);
    }
  };

  const handleCloseDriverDialog = () => {
    setIsOpenEditDriverDialog(false);
    setIsOpenAddDriverDialog(false);
  };
  const handleCloseTruckDialog = () => {
    setIsOpenEditTruckDialog(false);
    setIsOpenAddTruckDialog(false);
  };
  const handleCloseTrailerDialog = () => {
    setIsOpenEditTrailerDialog(false);
    setIsOpenAddTrailerDialog(false);
  };

  return (
    <div className="fleet-management-container">
      <div>
        <Dropdown className="main-button mb-3">
          <Dropdown.Toggle className="!bg-[#779BFB] focus:!outline-none focus:!ring-0 !border-none hover:!bg-[#6686DC] dark:!bg-[#6686DC] dark:hover:!bg-[#779BFB] dark:!text-neutral-950">
            Add
          </Dropdown.Toggle>

          <Dropdown.Menu className="dark:bg-slate-950 dark:border-gray-200">
            <Dropdown.Item
              onClick={() => setIsOpenAddDriverDialog(true)}
              className="focus:!bg-gray-50 focus:!text-neutral-950 dark:text-gray-200 dark:hover:bg-slate-900 dark:hover:text-gray-100 dark:focus:!bg-slate-900 dark:focus:!text-gray-100"
            >
              Add Driver
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setIsOpenAddTruckDialog(true)}
              className="focus:!bg-gray-50 focus:!text-neutral-950 dark:text-gray-200 dark:hover:bg-slate-900 dark:hover:text-gray-100 dark:focus:!bg-slate-900 dark:focus:!text-gray-100"
            >
              Add Truck
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setIsOpenAddTrailerDialog(true)}
              className="focus:!bg-gray-50 focus:!text-neutral-950 dark:text-gray-200 dark:hover:bg-slate-900 dark:hover:text-gray-100 dark:focus:!bg-slate-900 dark:focus:!text-gray-100"
            >
              Add Trailer
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div>
        <Dialog
          open={isOpenAddDriverDialog && !isEditingDriver}
          onClose={() => setIsOpenAddDriverDialog(false)}
          static={true}
        >
          <DialogPanel>
            <CloseButton
              onClick={() => setIsOpenAddDriverDialog(false)}
              className="main-button"
            />
            <AddDriverForm onAddDriver={handleAddDriver} />
          </DialogPanel>
        </Dialog>

        <Dialog
          open={isOpenAddTrailerDialog}
          onClose={() => setIsOpenAddTrailerDialog(false)}
          static={true}
        >
          <DialogPanel>
            <CloseButton
              onClick={() => setIsOpenAddTrailerDialog(false)}
              className="main-button"
            />
            <AddTrailerForm onAddTrailer={handleAddTrailer} />
          </DialogPanel>
        </Dialog>

        <Dialog
          open={isOpenEditDriverDialog}
          onClose={() => {
            setIsOpenEditDriverDialog(false);
            setEditedDriver(null);
            setIsEditingDriver(false);
          }}
          static={true}
        >
          <DialogPanel>
            <CloseButton
              onClick={() => {
                setIsOpenEditDriverDialog(false);
                setEditedDriver(null);
                setIsEditingDriver(false);
              }}
              className="main-button"
            />
            <EditDriverForm
              onEditDriver={handleEditDriver}
              editingDriver={editedDriver}
            />
          </DialogPanel>
        </Dialog>

        <Dialog
          open={isOpenEditTruckDialog}
          onClose={() => {
            setIsOpenEditTruckDialog(false);
            setEditedTruck(null);
            setIsEditingTruck(false);
          }}
          static={true}
        >
          <DialogPanel>
            <CloseButton
              onClick={() => {
                setIsOpenEditTruckDialog(false);
                setEditedTruck(null);
                setIsEditingTruck(false);
              }}
              className="main-button"
            />
            <EditTruckForm
              onEditTruck={handleEditTruck}
              editingTruck={editedTruck}
            />
          </DialogPanel>
        </Dialog>

        <Dialog
          open={isOpenEditTrailerDialog}
          onClose={() => {
            setIsOpenEditTrailerDialog(false);
            setEditedTrailer(null);
            setIsEditingTrailer(false);
          }}
          static={true}
        >
          <DialogPanel>
            <CloseButton
              onClick={() => {
                setIsOpenEditTrailerDialog(false);
                setEditedTrailer(null);
                setIsEditingTrailer(false);
              }}
              className="main-button"
            />
            <EditTrailerForm
              onEditTrailer={handleEditTrailer}
              editingTrailer={editedTrailer}
            />
          </DialogPanel>
        </Dialog>
      </div>

      <div>
        <VehiclesDetailsTable
          drivers={vehiclesDetails.drivers}
          trucks={vehiclesDetails.trucks}
          trailers={vehiclesDetails.trailers}
          onDeleteDriver={(driver, index) => handleDeleteDriver(driver, index)}
          onDeleteTruck={(truck, index) => handleDeleteTruck(truck, index)}
          onDeleteTrailer={(trailer, index) =>
            handleDeleteTrailer(trailer, index)
          }
          onEdit={(type, item) => handleEdit(type, item)}
        />
      </div>
    </div>
  );
};

export default FleetManagement;
