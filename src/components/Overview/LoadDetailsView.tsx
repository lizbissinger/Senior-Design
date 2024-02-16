import React from "react";
import { LoadDetail } from "../Types/types";
import { Card, List, ListItem } from "@tremor/react";

interface LoadDetailsViewProps {
  load: LoadDetail | null;
}

const LoadDetailsView: React.FC<LoadDetailsViewProps> = ({ load }) => {
  return (
    <Card>
      <List className="table">
        <ListItem>
          <strong>Load Number:</strong> {load?.loadNumber}
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
          <strong>Price:</strong> {load?.price}
        </ListItem>
        <ListItem>
          <strong>Detention Price:</strong> {load?.detentionPrice}
        </ListItem>
        <ListItem>
          <strong>All Miles:</strong> {load?.allMiles}
        </ListItem>
        <ListItem>
          <strong>Fuel Gallons:</strong> {load?.fuelGallons}
        </ListItem>
        <ListItem>
          <strong>Status:</strong> {load?.status}
        </ListItem>
      </List>
    </Card>
  );
};

export default LoadDetailsView;
