import React, { useState } from 'react';
import { LoadDetail } from '../Types/types';
import { Card, List, ListItem } from '@tremor/react';
import CloseButton from 'react-bootstrap/CloseButton';
import MapWithDirections from './MapWithDirections'; // Ensure this path matches your actual component's location

interface LoadDetailsViewProps {
  load: LoadDetail | null;
  onClose: () => void;
}

const LoadDetailsView: React.FC<LoadDetailsViewProps> = ({ load, onClose }) => {
  const [showMap, setShowMap] = useState(false);

  const toggleMapVisibility = () => setShowMap(!showMap);

  const handleMapCloseClick = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation(); // Prevents toggleMapVisibility when clicking the close button
    setShowMap(false);
  };

  return (
    <Card>
      <CloseButton onClick={onClose} className="main-button"></CloseButton>
      <List className="table">
      <List className="table">
        <ListItem>
          <strong>Load Number:</strong> {load?.loadNumber}
        </ListItem>
        <ListItem>
          <strong>Status:</strong> {load?.status}
        </ListItem>
        <ListItem>
          <strong>Price:</strong> {load?.price}
        </ListItem>
        <ListItem>
          <strong>Loaded Miles:</strong> {load?.allMiles}
        </ListItem>
        <ListItem>
          <strong>Truck:</strong> {load?.truckObject}
        </ListItem>
        <ListItem>
          <strong>Trailer:</strong> {load?.trailerObject}
        </ListItem>
        <ListItem>
          <strong>Driver:</strong> {load?.driverObject}
        </ListItem>
        <ListItem>
          <strong>Pickup Time:</strong> {load?.pickupTime}
        </ListItem>
        <ListItem>
          <strong>Delivery Time:</strong> {load?.deliveryTime}
        </ListItem>
        <ListItem>
          <strong>Pickup Location:</strong> {load?.pickupLocation}
        </ListItem>
        <ListItem>
          <strong>Delivery Location:</strong> {load?.deliveryLocation}
        </ListItem>
        <ListItem>
          <strong>Documents:</strong> {load?.documents}
        </ListItem>
        <ListItem>
          <strong>Detention Price:</strong> {load?.detentionPrice}
        </ListItem>
        <ListItem>
          <strong>Fuel (Gallons):</strong> {load?.fuelGallons}
        </ListItem>
      </List>
      </List>
      {/* Adjusted Card for DIRECTIONS */}
      <div onClick={toggleMapVisibility} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>DIRECTIONS</span>
        {showMap && <CloseButton onClick={handleMapCloseClick} />}
      </div>
      {showMap && load?.pickupLocation && load?.deliveryLocation && (
        <MapWithDirections
          pickupLocation={load.pickupLocation}
          deliveryLocation={load.deliveryLocation}
        />
      )}
    </Card>
  );
};

export default LoadDetailsView;
