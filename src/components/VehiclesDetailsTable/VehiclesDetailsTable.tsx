import React, { useState } from "react";
import { DriverDetail, TruckDetail, TrailerDetail } from "../Types/types";
import "./VehiclesDetailsTable.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';

type VehiclesDetailsTableProps = {
  drivers: DriverDetail[];
  trucks: TruckDetail[];
  trailers: TrailerDetail[];
  onDeleteDriver: (driver: DriverDetail, index: number) => void;
  onDeleteTruck: (truck: TruckDetail, index: number) => void;
  onDeleteTrailer: (trailer: TrailerDetail, index: number) => void;
  onEdit: (
    type: string,
    item: DriverDetail | TruckDetail | TrailerDetail
  ) => void;
};

const VehiclesDetailsTable: React.FC<VehiclesDetailsTableProps> = ({
  drivers,
  trucks,
  trailers,
  onDeleteDriver,
  onDeleteTruck,
  onDeleteTrailer,
  onEdit,
}) => {
  const [driverSearch, setDriverSearch] = useState<string>("");
  const [truckSearch, setTruckSearch] = useState<string>("");
  const [trailerSearch, setTrailerSearch] = useState<string>("");
  return (
    <div className="vehicles-details-container">
      <div className="drivers-table">
        <h3>Drivers</h3>
        <input
          type="text"
          placeholder="Search by name"
          value={driverSearch}
          onChange={(e) => setDriverSearch(e.target.value)}
        />
        <table className="vehicles-details-table">
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Driver License #</th>
              <th>Driver Phone #</th>
              <th>Driver Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.filter((driver) => driver.name.toLowerCase().includes(driverSearch.toLowerCase())).map((driver, index) => (
              <tr key={index}>
                <td>{driver.name}</td>
                <td>{driver.licenseNumber}</td>
                <td>{driver.phoneNumber}</td>
                <td>{driver.email}</td>
                <td>
                  <button
                    onClick={() => onEdit("driver", driver)}
                    className="edit-button"
                  >
                    <FontAwesomeIcon icon={faPenAlt} /> {/* Edit Icon */}
                  </button>
                  <button
                    onClick={() => onDeleteDriver(driver, index)}
                    className="delete-button"
                  >
                    <FontAwesomeIcon icon={faTrash} /> {/* Delete Icon */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="trucks-trailers-table">
        <div className="trucks-table">
          <h3>Trucks</h3>
          <input
            type="text"
            placeholder="Search by truck number"
            value={truckSearch}
            onChange={(e) => setTruckSearch(e.target.value)}
          />
          <table className="vehicles-details-table">
            <thead>
              <tr>
                <th>Truck #</th>
                <th>Truck Make</th>
                <th>Truck Model</th>
                <th>Truck Year</th>
                <th>Truck Vin #</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trucks.filter((truck) => truck.truckNumber.toLowerCase().includes(truckSearch.toLowerCase())).map((truck, index) => (
                <tr key={index}>
                  <td>{truck.truckNumber}</td>
                  <td>{truck.make}</td>
                  <td>{truck.model}</td>
                  <td>{truck.year}</td>
                  <td>{truck.vin}</td>
                  <td>
                    <button
                      onClick={() => onEdit("truck", truck)}
                      className="edit-button"
                    >
                      <FontAwesomeIcon icon={faPenAlt} /> {/* Edit Icon */}
                    </button>
                    <button
                      onClick={() => onDeleteTruck(truck, index)}
                      className="delete-button"
                    >
                      <FontAwesomeIcon icon={faTrash} /> {/* Delete Icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="trailers-table">
          <h3>Trailers</h3>
          <input
            type="text"
            placeholder="Search by trailer number"
            value={trailerSearch}
            onChange={(e) => setTrailerSearch(e.target.value)}
          />
          <table className="vehicles-details-table">
            <thead>
              <tr>
                <th>Trailer #</th>
                <th>Trailer Make</th>
                <th>Trailer Model</th>
                <th>Trailer Year</th>
                <th>Trailer Vin #</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trailers.filter((trailer) => trailer.trailerNumber.toLowerCase().includes(trailerSearch.toLowerCase())).map((trailer, index) => (
                <tr key={index}>
                  <td>{trailer.trailerNumber}</td>
                  <td>{trailer.make}</td>
                  <td>{trailer.model}</td>
                  <td>{trailer.year}</td>
                  <td>{trailer.vin}</td>
                  <td>
                    <button
                      onClick={() => onEdit("trailer", trailer)}
                      className="edit-button"
                    >
                      <FontAwesomeIcon icon={faPenAlt} /> {/* Edit Icon */}
                    </button>
                    <button
                      onClick={() => onDeleteTrailer(trailer, index)}
                      className="delete-button"
                    >
                      <FontAwesomeIcon icon={faTrash} /> {/* Delete Icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehiclesDetailsTable;
