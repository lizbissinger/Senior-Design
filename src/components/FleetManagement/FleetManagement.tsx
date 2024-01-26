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
} from "../../routes/driverDetails";
import GetAllTrailers, {
  CreateNewTrailer,
  DeleteTrailer,
} from "../../routes/trailerDetails";
import GetAllTrucks, {
  CreateNewTruck,
  DeleteTruck,
} from "../../routes/truckDetails";

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
  }, [drivers, trailers, trucks]);

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
      await DeleteDriver(driver._id);
      console.log("Driver deleted:", driver);

      const updatedDrivers = drivers.filter((d, i) => i !== index);
      setDrivers(updatedDrivers);

      setVehiclesDetails((prevDetails) => ({
        ...prevDetails,
        drivers: updatedDrivers,
      }));

      setSelectedDriver(null);
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const handleDeleteTruck = async (truck: TruckDetail, index: number) => {
    try {
      await DeleteTruck(truck._id);
      console.log("Truck deleted:", truck);

      const updatedTrucks = trucks.filter((t, i) => i !== index);
      setTrucks(updatedTrucks);

      setVehiclesDetails((prevDetails) => ({
        ...prevDetails,
        trucks: updatedTrucks,
      }));

      setSelectedTruck(null);
    } catch (error) {
      console.error("Error deleting truck:", error);
    }
  };

  const handleDeleteTrailer = async (trailer: TrailerDetail, index: number) => {
    try {
      await DeleteTrailer(trailer._id);
      console.log("Trailer deleted:", trailer);

      const updatedTrailers = trailers.filter((t, i) => i !== index);
      setTrailers(updatedTrailers);

      setVehiclesDetails((prevDetails) => ({
        ...prevDetails,
        trailers: updatedTrailers,
      }));

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
        setEditingDriver(item as DriverDetail);
        setShowDriverForm(true);
        break;
      case "truck":
        setEditingTruck(item as TruckDetail);
        setShowTruckForm(true);
        break;
      case "trailer":
        setEditingTrailer(item as TrailerDetail);
        setShowTrailerForm(true);
        break;
      default:
        break;
    }
  };

  const handleEditDriver = (editedDriver: DriverDetail) => {
    const updatedDrivers = drivers.map((driver) =>
      driver._id === editedDriver._id ? editedDriver : driver
    );

    setDrivers(updatedDrivers);

    setVehiclesDetails((prevDetails) => ({
      ...prevDetails,
      drivers: updatedDrivers,
    }));

    setShowDriverForm(false);

    setEditingDriver(null);
  };

  const handleEditTruck = (editedTruck: TruckDetail) => {
    const updatedTrucks = trucks.map((truck) =>
      truck._id === editedTruck._id ? editedTruck : truck
    );

    setTrucks(updatedTrucks);

    setVehiclesDetails((prevDetails) => ({
      ...prevDetails,
      trucks: updatedTrucks,
    }));

    setShowTruckForm(false);

    setEditingTruck(null);
  };

  const handleEditTrailer = (editedTrailer: TrailerDetail) => {
    const updatedTrailers = trailers.map((trailer) =>
      trailer._id === editedTrailer._id ? editedTrailer : trailer
    );

    setTrailers(updatedTrailers);

    setVehiclesDetails((prevDetails) => ({
      ...prevDetails,
      trailers: updatedTrailers,
    }));

    setShowTrailerForm(false);

    setEditingTrailer(null);
  };

  return (
    <div className="fleet-management-container">
      <h2>Fleet Management</h2>

      <div className="add-button form">
        <button
          type="button"
          className="dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Add
        </button>
        <div className="dropdown-menu form">
          <button
            className="dropdown-item"
            onClick={() => handleAddButtonClick("driver")}
          >
            Add Driver
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleAddButtonClick("truck")}
          >
            Add Truck
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleAddButtonClick("trailer")}
          >
            Add Trailer
          </button>
        </div>
      </div>

      {showDriverForm && (
        <div className="popup active form">
          <DriverForm
            onAddDriver={handleAddDriver}
            onEditDriver={handleEditDriver}
            editingDriver={editingDriver}
          />
          <button onClick={() => setShowDriverForm(false)}>Close</button>
        </div>
      )}

      {showTruckForm && (
        <div className="popup active form">
          <TruckForm
            onAddTruck={handleAddTruck}
            onEditTruck={handleEditTruck}
            editingTruck={editingTruck}
          />
          <button onClick={() => setShowTruckForm(false)}>Close</button>
        </div>
      )}

      {showTrailerForm && (
        <div className="popup active form">
          <TrailerForm
            onAddTrailer={handleAddTrailer}
            onEditTrailer={handleEditTrailer}
            editingTrailer={editingTrailer}
          />
          <button onClick={() => setShowTrailerForm(false)}>Close</button>
        </div>
      )}

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
