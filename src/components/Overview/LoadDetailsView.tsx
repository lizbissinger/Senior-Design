import React, { useState, useEffect } from "react";
import { LoadDetail } from "../Types/types";
import { Card, List, ListItem } from "@tremor/react";
import CloseButton from "react-bootstrap/CloseButton";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

interface LoadDetailsViewProps {
  load: LoadDetail | null;
  onClose: () => void;
}

const LoadDetailsView: React.FC<LoadDetailsViewProps> = ({ load, onClose }) => {
  // State type is explicitly DirectionsResult or null
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: 39.50, lng: -98.35 });

  useEffect(() => {
    if (!load?.pickupLocation || !load?.deliveryLocation) {
      setDirectionsResponse(null);
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: load.pickupLocation,
      destination: load.deliveryLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        setDirectionsResponse(result);
        if (result.routes[0]) {
          // Updating mapCenter to use the center of the bounds from the first route
          setMapCenter(result.routes[0].bounds.getCenter().toJSON());
        }
      } else {
        console.error(`Failed to fetch directions: ${status}`, result);
        setDirectionsResponse(null);
      }
    });
  }, [load]);

  return (
    <Card>
      <CloseButton onClick={onClose} className="main-button"></CloseButton>
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
      {directionsResponse && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={mapCenter}
        >
          <DirectionsRenderer directions={directionsResponse} />
        </GoogleMap>
      )}
    </Card>
  );
};

export default LoadDetailsView;
