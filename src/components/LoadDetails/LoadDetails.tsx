import React, { useState } from 'react';

interface LoadDetailsProps {
  loadInfo: {
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
  };
}

const LoadDetails: React.FC<LoadDetailsProps> = ({ loadInfo }) => {
  
  const [editedLoadInfo, setEditedLoadInfo] = useState(loadInfo);

  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedLoadInfo((prevLoadInfo) => ({
      ...prevLoadInfo,
      [name]: value,
    }));
  };

  return (
    <div className="load-details-table">
      <h3>Tracking Load Details</h3>
      <table>
        <tbody>
          <tr>
            <th>LOAD#</th>
            <td>
              <input
                type="text"
                name="loadNumber"
                value={editedLoadInfo.loadNumber}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Truck Object</th>
            <td>
              <input
                type="text"
                name="truckObject"
                value={editedLoadInfo.truckObject}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default LoadDetails;
