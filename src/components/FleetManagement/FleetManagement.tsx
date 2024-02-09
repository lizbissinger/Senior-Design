import React, { useEffect, useState } from "react";
import "./FleetManagement.css";
import DriverForm from "../DriverForm/DriverForm";
import TruckForm from "../TruckForm/TruckForm";
import TrailerForm from "../TrailerForm/TrailerForm";
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
import { de } from "@faker-js/faker";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  MultiSelect,
  MultiSelectItem,
  Grid,
  Button,
  Dialog,
  DialogPanel,
} from "@tremor/react";
import { Dropdown, DropdownButton } from "react-bootstrap";
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

  const [editingDriver, setEditingDriver] = useState<DriverDetail | null>(null);
  const [editingTruck, setEditingTruck] = useState<TruckDetail | null>(null);
  const [editingTrailer, setEditingTrailer] = useState<TrailerDetail | null>(
    null
  );

  const [isOpenDriverDialog, setIsOpenDriverDialog] = useState(false);
  const [isOpenTruckDialog, setIsOpenTruckDialog] = useState(false);
  const [isOpenTrailerDialog, setIsOpenTrailerDialog] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    setIsOpenDriverDialog(false);
    setIsOpenTruckDialog(false);
    setIsOpenTrailerDialog(false);
    setIsOpenDialog(false);
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

  const handleAddButtonClick = (type: string) => {
    switch (type) {
      case "driver":
        setShowDriverForm(true);
        setEditingDriver(null);
        break;
      case "truck":
        setShowTruckForm(true);
        setEditingTruck(null);
        break;
      case "trailer":
        setShowTrailerForm(true);
        setEditingTrailer(null);
        break;
      default:
        break;
    }
  };

  const handleEdit = (
    type: string,
    item: DriverDetail | TruckDetail | TrailerDetail
  ) => {
    switch (type) {
      case "driver":
        setSelectedDriver(item as DriverDetail);
        setEditingDriver(item as DriverDetail);
        setShowDriverForm(true);
        setShowTruckForm(false);
        setShowTrailerForm(false);
        setIsOpenDriverDialog(true);
        break;
      case "truck":
        setSelectedTruck(item as TruckDetail);
        setEditingTruck(item as TruckDetail);
        setShowDriverForm(false);
        setShowTruckForm(true);
        setShowTrailerForm(false);
        setIsOpenTruckDialog(true);
        break;
      case "trailer":
        setSelectedTrailer(item as TrailerDetail);
        setEditingTrailer(item as TrailerDetail);
        setShowDriverForm(false);
        setShowTruckForm(false);
        setShowTrailerForm(true);
        setIsOpenTrailerDialog(true);
        break;
      default:
        break;
    }
    setIsOpenDialog(false);
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
      setEditingDriver(null);
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
      setEditingTruck(null);
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
      setEditingTrailer(null);
    } catch (error) {
      console.error("Error updating trailer:", error);
    }
  };

  const handleCloseDriverDialog = () => {
    setIsOpenDriverDialog(false);
  };

  return (
    <div className="fleet-management-container">
      <div className="form">
        <Dropdown className="main-button">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Add
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setIsOpenDriverDialog(true)}>
              Add Driver
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setIsOpenTruckDialog(true)}>
              Add Truck
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setIsOpenTrailerDialog(true)}>
              Add Trailer
            </Dropdown.Item>
          </Dropdown.Menu>

          <Dialog
            open={isOpenDriverDialog}
            onClose={() => setIsOpenDriverDialog(false)}
            static={true}
          >
            <DialogPanel>
              <CloseButton
                onClick={handleCloseDriverDialog}
                className="main-button"
              ></CloseButton>
              <DriverForm
                onAddDriver={handleAddDriver}
                onEditDriver={handleEditDriver}
                editingDriver={editingDriver}
              />
            </DialogPanel>
          </Dialog>

          <Dialog
            open={isOpenTruckDialog}
            onClose={() => setIsOpenTruckDialog(false)}
            static={true}
          >
            <DialogPanel className="form">
              <TruckForm
                onAddTruck={handleAddTruck}
                onEditTruck={handleEditTruck}
                editingTruck={editingTruck}
              />
            </DialogPanel>
          </Dialog>

          <Dialog
            open={isOpenTrailerDialog}
            onClose={() => setIsOpenTrailerDialog(false)}
            static={true}
          >
            <DialogPanel className="form">
              <TrailerForm
                onAddTrailer={handleAddTrailer}
                onEditTrailer={handleEditTrailer}
                editingTrailer={editingTrailer}
              />
            </DialogPanel>
          </Dialog>
        </Dropdown>
      </div>

      <div className="load-details-table">
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
