import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface MapWithDirectionsProps {
  pickupLocation: string;
  deliveryLocation: string;
}

const googleMapsApiKey = "AIzaSyCGylTS64QlW8c1eGxcBtDbcgsa8roUPuM";

const MapWithDirections: React.FC<MapWithDirectionsProps> = ({
  pickupLocation,
  deliveryLocation,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    if (pickupLocation && deliveryLocation) {
      directionsService.route(
        {
          origin: pickupLocation,
          destination: deliveryLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
            setDirections(null);
          }
        }
      );
    }
  }, [pickupLocation, deliveryLocation]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps</div>;
  }

  const defaultCenter = { lat: -34.397, lng: 150.644 }; // A fallback center
  const mapCenter = directions?.routes[0]?.bounds?.getCenter() || defaultCenter;
  
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={8} // Consider dynamically adjusting zoom based on the route
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default React.memo(MapWithDirections);
