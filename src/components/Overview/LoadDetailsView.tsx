import React, { useState } from "react";
import pdfPlaceholder from "./PdfThumbnail.jpg";
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
import { LoadDetail } from "../Types/types";

interface LoadDetailsViewProps {
  load: LoadDetail | null;
  onClose: () => void;
}

const LoadDetailsView: React.FC<LoadDetailsViewProps> = ({ load, onClose }) => {
  const [showMap, setShowMap] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

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

  const viewDocumentInTab = (docData: any) => {
    let blob;

    if (docData instanceof File) {
      blob = new Blob([docData], { type: docData.type });
    } else if (docData.data && Array.isArray(docData.data.data)) {
      blob = new Blob([new Uint8Array(docData.data.data)], {
        type: docData.contentType,
      });
    } else {
      console.error("Unsupported document format");
      return;
    }

    const url = window.URL.createObjectURL(blob);
    setDocumentUrl(url);
  };

  const closeDocumentViewer = () => {
    setDocumentUrl(null);
  };

  return (
    <Card decoration="left" decorationColor="blue" className="">
      <CloseButton onClick={onClose} className="mb-1 main-button"></CloseButton>
      <TabGroup>
        <TabList variant="line" defaultValue="1">
          <Tab value="1">Load Info</Tab>
          <Tab value="2">Directions</Tab>
          <Tab value="3">Documents</Tab>
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
                <strong>Pickup Time:</strong>{" "}
                {formatDetailTimes(load?.pickupTime)}
              </ListItem>
              <ListItem>
                <strong>Delivery Time:</strong>{" "}
                {formatDetailTimes(load?.deliveryTime)}
              </ListItem>
              <ListItem>
                <strong>Pickup Location:</strong> {load?.pickupLocation}
              </ListItem>
              <ListItem>
                <strong>Delivery Location:</strong> {load?.deliveryLocation}
              </ListItem>
              <ListItem>
                <strong>Detention Price:</strong> {load?.detentionPrice}
              </ListItem>
              <ListItem>
                <strong>Fuel (Gallons):</strong> {load?.fuelGallons}
              </ListItem>
              <ListItem>
                <strong>Created At:</strong>{" "}
                {formatDetailTimes(load?.createdAt)}
              </ListItem>
              <ListItem>
                <strong>Last Updated At:</strong>{" "}
                {formatDetailTimes(load?.updatedAt)}
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

          <TabPanel>
            <List className="dark-font">
              {documentUrl ? (
                <>
                  <Button variant="light" onClick={closeDocumentViewer}>
                    Close Document
                  </Button>
                  <iframe
                    src={documentUrl}
                    style={{ width: "100%", height: "600px", border: "none" }}
                  ></iframe>
                </>
              ) : (
                <List className="dark-font">
                  {load?.documents?.map((document: any, index) => (
                    <ListItem
                      key={index}
                      onClick={() => viewDocumentInTab(document)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={pdfPlaceholder}
                        alt={document.fileName}
                        style={{ width: 100 }}
                      />
                      <p>{document.fileName || document.name || "Document"}</p>
                    </ListItem>
                  ))}
                </List>
              )}
            </List>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};

export default LoadDetailsView;
