import React, { useState } from 'react';
import './Overview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import DriverDropdown from '../DriverDropdown/DriverDropdown';
import DriverForm from '../DriverForm/DriverForm';
import _ from 'lodash'; //Sorting Library

interface LoadDetail {
  loadNumber: string;
  truckObject: string;
  trailerObject: string;
  driverObject: string;
  pickupTime: string;
  deliveryTime: string;
  documents: string;
  price: string;
  detention: string;
  allMiles: string;
  gallons: string;
  status: string;
  brokerInfo: {
    name: string;
    phoneNumber: string;
    email: string;
    company: string;
  };
  comments: string;
}

const Overview: React.FC = () => {
  const [loadDetails, setLoadDetails] = useState<LoadDetail[]>([]);
  const [newLoad, setNewLoad] = useState<LoadDetail>({
    loadNumber: '',
    truckObject: '',
    trailerObject: '',
    driverObject: '',
    pickupTime: '',
    deliveryTime: '',
    documents: '',
    price: '',
    detention: '',
    allMiles: '',
    gallons: '',
    status: '',
    brokerInfo: {
      name: '',
      phoneNumber: '',
      email: '',
      company: '',
    },
    comments: '',
  });

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
    key: "", // Initialize with an empty key
    direction: "asc", // Set the initial direction to "asc"
  });
  

  const sortedData = _.orderBy(loadDetails, [sortConfig.key], [sortConfig.direction]);

  const [drivers, setDrivers] = useState<string[]>([]);

  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDriverSelect = (selectedDriver: string) => {
    setNewLoad({ ...newLoad, driverObject: selectedDriver });
  };

  const handleAddDriver = (driver: string) => {
    setDrivers([...drivers, driver]);
    setNewLoad({ ...newLoad, driverObject: driver });
  };

  const addLoadDetail = () => {
    setLoadDetails([...loadDetails, newLoad]);
    setNewLoad({
      loadNumber: '',
      truckObject: '',
      trailerObject: '',
      driverObject: '',
      pickupTime: '',
      deliveryTime: '',
      documents: '',
      price: '',
      detention: '',
      allMiles: '',
      gallons: '',
      status: '',
      brokerInfo: {
        name: '',
        phoneNumber: '',
        email: '',
        company: '',
      },
      comments: '',
    });
    setShowForm(false);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  const handleEditClick = (index: number) => {
    
    setEditableIndex(index);
  };

  const handleSaveClick = (index: number) => {
    
    const updatedLoadDetails = [...loadDetails];
    updatedLoadDetails[index] = loadDetails[index];
    setLoadDetails(updatedLoadDetails);

    
    setEditableIndex(null);
  };

  const handleDeleteClick = (index: number) => {
    
    const updatedLoadDetails = [...loadDetails];
    updatedLoadDetails.splice(index, 1);
    setLoadDetails(updatedLoadDetails);
  };
  const renderSortArrow = (column : string) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return null;
  };
  const requestSort  = (key: string) => {
    let direction:"asc" | "desc" = "asc";

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  return (
    <div className="overview-container">
      <h2>Overview</h2>

      <div>
        {!showForm ? (
          <div className="add-button">
          <button onClick={toggleFormVisibility}>
            <FontAwesomeIcon icon={faPlus} /> {/* Use the plus icon */}
          </button>
          </div>
        ) : (
            <div>
                <div className="form">
                {/* Input fields for adding new load details */}
                <input
                    type="text"
                    placeholder="Load #"
                    value={newLoad.loadNumber}
                    onChange={(e) => setNewLoad({ ...newLoad, loadNumber: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Truck #"
                    value={newLoad.truckObject}
                    onChange={(e) => setNewLoad({ ...newLoad, truckObject: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Trailer #"
                    value={newLoad.trailerObject}
                    onChange={(e) => setNewLoad({ ...newLoad, trailerObject: e.target.value })}
                />
                <div>
                    {/* Use the DriverDropdown component to select a driver */}
                    <DriverDropdown driverList={drivers} selectedDriver={newLoad.driverObject} onSelectDriver={handleDriverSelect} />
                </div>

                <div>
                    {/* Use the DriverForm component to add new drivers */}
                    <DriverForm onAddDriver={handleAddDriver} />
                </div>
                <input
                    type="time"
                    placeholder="Pick-Up Time"
                    value={newLoad.pickupTime}
                    onChange={(e) => setNewLoad({ ...newLoad, pickupTime: e.target.value })}
                />
                <input
                    type="time"
                    placeholder="Delivery Time"
                    value={newLoad.deliveryTime}
                    onChange={(e) => setNewLoad({ ...newLoad, deliveryTime: e.target.value })}
                />
                <input
                    type="file"
                    placeholder="Documents"
                    value={newLoad.documents}
                    onChange={(e) => setNewLoad({ ...newLoad, documents: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={newLoad.price}
                    onChange={(e) => setNewLoad({ ...newLoad, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Detention"
                    value={newLoad.detention}
                    onChange={(e) => setNewLoad({ ...newLoad, detention: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Miles"
                    value={newLoad.allMiles}
                    onChange={(e) => setNewLoad({ ...newLoad, allMiles: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Fuel"
                    value={newLoad.gallons}
                    onChange={(e) => setNewLoad({ ...newLoad, gallons: e.target.value })}
                />
                {/* Add similar input fields for the other columns */}
                <button onClick={addLoadDetail}>Add</button>
                </div>
            </div>
        )}
      </div>

      <div>
        <p></p>
        <div className='table-container'>
        <table className="load-details-table">
          {/* The table headers */}
          <thead>
            <tr>
            <th onClick={() => requestSort('loadNumber')}> Load # {sortConfig.key === "loadNumber" && sortConfig.direction === 'asc' ? '▲' : '▼'}</th>
              <th>Truck #</th>
              <th>Trailer #</th>
              <th>Driver Name</th>
              <th>Pick-up Time</th>
              <th>Delivery Time</th>
              <th>Documents</th>
              <th onClick={() => requestSort('price')}> Price {sortConfig.key === "price" && sortConfig.direction === 'asc' ? '▲' : '▼'}</th>
              <th>Detention</th>
              <th>All miles</th>
              <th onClick={() => requestSort('gallons')}> Gallons {sortConfig.key === "gallons" && sortConfig.direction === 'asc' ? '▲' : '▼'}</th>
              <th onClick={() => requestSort('status')}> Status {sortConfig.key === "status" && sortConfig.direction === 'asc' ? '▲' : '▼'}</th>
              {/* <th>Broker info</th>
              <th>Name</th>
              <th>Phone number</th>
              <th>Email</th> */}
              <th>Action</th>
            </tr>
          </thead>
          {/* The table body */}
          <tbody>
            {sortedData.map((load, index) => (
              <tr key={index}>
                <td>
                  {editableIndex === index ? (
                    <input
                        className='load-details-table'
                        type="text"
                        value={load.loadNumber}
                        onChange={(e) => {
                            const updatedLoad = { ...load };
                            updatedLoad.loadNumber = e.target.value;
                            setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                            });
                        }}
                    />
                  ) : (
                    load.loadNumber
                  )}
                </td>
                <td>
                    {editableIndex === index ? (
                    <input
                        className='load-details-table'
                        type="text"
                        value={load.truckObject}
                        onChange={(e) => {
                        const updatedLoad = { ...load };
                        updatedLoad.truckObject = e.target.value;
                        setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                        });
                        }}
                    />
                    ) : (
                    load.truckObject
                    )}
                </td>
                <td>
                    {editableIndex === index ? (
                    <input
                        className='load-details-table'
                        type="text"
                        value={load.trailerObject}
                        onChange={(e) => {
                        const updatedLoad = { ...load };
                        updatedLoad.trailerObject = e.target.value;
                        setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                        });
                        }}
                    />
                    ) : (
                    load.trailerObject
                    )}
                </td>
                <td>
                    {editableIndex === index ? (
                    <input
                        className='load-details-table'
                        type="text"
                        value={load.driverObject}
                        onChange={(e) => {
                        const updatedLoad = { ...load };
                        updatedLoad.driverObject = e.target.value;
                        setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                        });
                        }}
                    />
                    ) : (
                    load.driverObject
                    )}
                </td>
                <td>
                    {editableIndex === index ? (
                    <input
                        className='load-details-table'
                        type="text"
                        value={load.pickupTime}
                        onChange={(e) => {
                        const updatedLoad = { ...load };
                        updatedLoad.pickupTime = e.target.value;
                        setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                        });
                        }}
                    />
                    ) : (
                    load.pickupTime
                    )}
                </td>
                <td>
                    {editableIndex === index ? (
                    <input
                        className='load-details-table'
                        type="text"
                        value={load.deliveryTime}
                        onChange={(e) => {
                        const updatedLoad = { ...load };
                        updatedLoad.deliveryTime = e.target.value;
                        setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                        });
                        }}
                    />
                    ) : (
                    load.deliveryTime
                    )}
                </td>
                <td>
                    {editableIndex === index ? (
                    <input
                        className='load-details-table'
                        type="text"
                        value={load.documents}
                        onChange={(e) => {
                        const updatedLoad = { ...load };
                        updatedLoad.documents = e.target.value;
                        setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                        });
                        }}
                    />
                    ) : (
                    load.documents
                    )}
                </td>
                <td>
                    {editableIndex === index ? (
                        <input
                        className='load-details-table'
                        type="text"
                        value={load.price}
                        onChange={(e) => {
                            const updatedLoad = { ...load };
                            updatedLoad.price = e.target.value;
                            setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                            });
                        }}
                        />
                    ) : (
                        `$${parseFloat(load.price).toFixed(2)}`
                    )}
                </td>
                <td>
                    {editableIndex === index ? (
                        <input
                        className='load-details-table'
                        type="text"
                        value={load.detention}
                        onChange={(e) => {
                            const updatedLoad = { ...load };
                            updatedLoad.detention = e.target.value;
                            setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                            });
                        }}
                        />
                    ) : (
                        `$${parseFloat(load.detention).toFixed(2)}`
                    )}
                </td>
                <td>
                    {editableIndex === index ? (
                    <input
                        className='load-details-table'
                        type="text"
                        value={load.allMiles}
                        onChange={(e) => {
                        const updatedLoad = { ...load };
                        updatedLoad.allMiles = e.target.value;
                        setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                        });
                        }}
                    />
                    ) : (
                    load.allMiles
                    )}
                </td>
                <td>
                    {editableIndex === index ? (
                    <input
                        className='load-details-table'
                        type="text"
                        value={load.gallons}
                        onChange={(e) => {
                        const updatedLoad = { ...load };
                        updatedLoad.gallons = e.target.value;
                        setLoadDetails((prevLoadDetails) => {
                            const updatedDetails = [...prevLoadDetails];
                            updatedDetails[index] = updatedLoad;
                            return updatedDetails;
                        });
                        }}
                    />
                    ) : (
                    load.gallons
                    )}
                </td>
                <td className={`status-cell ${load.status.toLowerCase()}`}>
                {editableIndex === index ? (
                    <select
                    className='load-details-table'
                    value={load.status}
                    onChange={(e) => {
                        const updatedLoad = { ...load };
                        updatedLoad.status = e.target.value;
                        setLoadDetails((prevLoadDetails) => {
                        const updatedDetails = [...prevLoadDetails];
                        updatedDetails[index] = updatedLoad;
                        return updatedDetails;
                        });
                    }}
                    >
                    <option value="Yellow">Enroute to Shipper</option>
                    <option value="Yellow">At Shipper</option>
                    <option value="Yellow">Loaded</option>
                    <option value="Yellow">Enroute to Receiver</option>
                    <option value="Yellow">At Receiver</option>
                    <option value="Red">Shipment Issue</option>
                    <option value="Red">Payment Issue</option>
                    <option value="Green">Delivered</option>
                    </select>
                ) : (
                    load.status
                )}
                </td>
                <td>
                {editableIndex === index ? (
                    <div>
                    <button onClick={() => handleSaveClick(index)}>
                        <FontAwesomeIcon icon={faPenAlt} /> {/* Save icon */}
                    </button>
                    <button onClick={() => handleDeleteClick(index)}>
                        <FontAwesomeIcon icon={faTrash} /> {/* Delete icon */}
                    </button>
                    </div>
                ) : (
                    <div>
                    <button onClick={() => handleEditClick(index)}>
                        <FontAwesomeIcon icon={faPenAlt} /> {/* Edit icon */}
                    </button>
                    <button onClick={() => handleDeleteClick(index)}>
                        <FontAwesomeIcon icon={faTrash} /> {/* Delete icon */}
                    </button>
                    </div>
                )}
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

export default Overview;
