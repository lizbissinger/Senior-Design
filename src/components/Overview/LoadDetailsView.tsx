import React, { useState } from "react";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  Button,
  Card,
  List,
  ListItem,
  TabPanels,
} from "@tremor/react";
import CloseButton from "react-bootstrap/CloseButton";
import MapWithDirections from "./MapWithDirections";
import "./Overview.css";
import { LoadDetail } from "../Types/types"; // Make sure to import your LoadDetail type

interface LoadDetailsViewProps {
  load: LoadDetail | null;
  onClose: () => void;
}

const LoadDetailsView: React.FC<LoadDetailsViewProps> = ({ load, onClose }) => {
  const [showMap, setShowMap] = useState(false);

  const toggleMapVisibility = () => setShowMap(!showMap);

  const handleMapCloseClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setShowMap(false);
  };

  const formatDetailTimes = (timestamp: string | undefined) => {
    if (!timestamp) return "";
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "America/New_York",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timestamp).toLocaleString("en-US", options);
  }; 

  return (
    <Card decoration="left" decorationColor="blue" className="">
      <CloseButton onClick={onClose} className="mb-1 main-button"></CloseButton>
      <TabGroup>
        <TabList variant="line" defaultValue="1">
          <Tab value="1">Load Info</Tab>
          <Tab value="2">Directions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <List className="dark-font">
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
                <strong>Pickup Time:</strong> {formatDetailTimes(load?.pickupTime)}
              </ListItem>
              <ListItem>
                <strong>Delivery Time:</strong> {formatDetailTimes(load?.deliveryTime)}
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
              <ListItem>
                <strong>Created At:</strong> {formatDetailTimes(load?.createdAt)}
              </ListItem>
              <ListItem>
                <strong>Last Updated At:</strong> {formatDetailTimes(load?.updatedAt)}
              </ListItem>
            </List>
          </TabPanel>
          <TabPanel>
            <div
              onClick={toggleMapVisibility}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button variant="light">View Directions</Button>
              {showMap && <CloseButton onClick={handleMapCloseClick} />}
            </div>
            {showMap && load?.pickupLocation && load?.deliveryLocation && (
              <MapWithDirections
                pickupLocation={load.pickupLocation}
                deliveryLocation={load.deliveryLocation}
              />
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};

export default LoadDetailsView;
