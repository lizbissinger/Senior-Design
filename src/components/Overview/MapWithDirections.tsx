import React, { useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer, useLoadScript } from "@react-google-maps/api";
const Google_Maps_Api_Key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface MapWithDirectionsProps {
  pickupLocation: string;
  deliveryLocation: string;
}

const MapWithDirections: React.FC<MapWithDirectionsProps> = ({ pickupLocation, deliveryLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: Google_Maps_Api_Key,
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    const fetchDirections = () => {
      if (!pickupLocation || !deliveryLocation) return;

      const directionsService = new google.maps.DirectionsService();
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
            console.error(`Failed to fetch directions: ${status}`);
            setDirections(null);
          }
        }
      );
    };

    if (isLoaded) fetchDirections();
  }, [isLoaded, pickupLocation, deliveryLocation]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={directions?.routes[0]?.bounds?.getCenter()}
      zoom={10}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default React.memo(MapWithDirections);
