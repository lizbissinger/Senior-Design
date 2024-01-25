import React from "react";
import { DriverDetail, TruckDetail, TrailerDetail } from "../Types/types";
import "./VehiclesDetailsTable.css";

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
  return (
    <div className="vehicles-details-container">
      <div className="drivers-table">
        <h3>Drivers</h3>
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
            {drivers.map((driver, index) => (
              <tr key={index}>
                <td>{driver.name}</td>
                <td>{driver.licenseNumber}</td>
                <td>{driver.phoneNumber}</td>
                <td>{driver.email}</td>
                <td>
                  <button
                    onClick={() => onDeleteDriver(driver, index)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit("driver", driver)}
                    className="edit-button"
                  >
                    Edit
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
              {trucks.map((truck, index) => (
                <tr key={index}>
                  <td>{truck.truckNumber}</td>
                  <td>{truck.make}</td>
                  <td>{truck.model}</td>
                  <td>{truck.year}</td>
                  <td>{truck.vin}</td>
                  <td>
                    <button
                      onClick={() => onDeleteTruck(truck, index)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onEdit("truck", truck)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="trailers-table">
          <h3>Trailers</h3>
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
              {trailers.map((trailer, index) => (
                <tr key={index}>
                  <td>{trailer.trailerNumber}</td>
                  <td>{trailer.make}</td>
                  <td>{trailer.model}</td>
                  <td>{trailer.year}</td>
                  <td>{trailer.vin}</td>
                  <td>
                    <button
                      onClick={() => onDeleteTrailer(trailer, index)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onEdit("trailer", trailer)}
                      className="edit-button"
                    >
                      Edit
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
