import React, { useState, useEffect } from "react";
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
import { LoadDetail, CustomFile } from "../Types/types";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Email from "./Email";
import { fetchDocuments, deleteDocument } from "../../routes/documents";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface LoadDetailsViewProps {
  load: LoadDetail | null;
  onClose: () => void;
  updateLoadDocuments: (loadId: string, newDocuments: CustomFile[]) => void; 
}

const LoadDetailsView: React.FC<LoadDetailsViewProps> = ({ load, onClose, updateLoadDocuments  }) => {
  const [showMap, setShowMap] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [documents, setDocuments] = useState<CustomFile[]>([]); 
  const toggleMapVisibility = () => setShowMap(!showMap);

  useEffect(() => {
    const fetchAndSetDocuments = async () => {
      if (load) {
        try {
          const fetchedDocs = await fetchDocuments(load._id);
          setDocuments(fetchedDocs);
          
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      }
    };
  
    fetchAndSetDocuments();
  }, [load]); 


  useEffect(() => {
    console.log(documents);
    console.log("below is the active load da documents field")
    console.log(load?.documents)
  }, [documents]);
  
  

  const handleDeleteDocument = async (documentId: any) => {
  const loadId = load?._id;
  if (!loadId) {
    console.error("Load ID is undefined.");
    return;
  }

  try {
    await deleteDocument(loadId, documentId);
    const fetchedDocs = await fetchDocuments(loadId);
    setDocuments(fetchedDocs);
    updateLoadDocuments(loadId, fetchedDocs);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};


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

  const viewDocumentInTab = (document: CustomFile) => {
    if (document.data) {
      const byteCharacters = atob(document.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: document.contentType });

      const url = window.URL.createObjectURL(blob);
      setDocumentUrl(url);
    } else {
      console.error("Document data is not available");
    }
  };

  const closeDocumentViewer = () => {
    setDocumentUrl(null);
  };

  return (
    <Card decoration="left" decorationColor="#6686DC">
      <XMarkIcon onClick={onClose} className="main-button dark:text-white cursor-pointer w-7 h-7" />
      <TabGroup>
        <TabList className="px-1" variant="line" defaultValue="1">
          <Tab value="1" className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]">Load Info</Tab>
          <Tab value="2" className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]">Directions</Tab>
          <Tab value="3" className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]">Documents</Tab>
          <Tab value="4" className="ui-selected:!text-[#6686DC] ui-selected:!border-[#6686DC]">Update</Tab>
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
              <Button variant="light" className="text-[#779BFB] focus:!outline-none focus:!ring-0 !border-none hover:text-[#6686DC] dark:text-[#6686DC] dark:hover:text-[#779BFB]">View Directions</Button>
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
                  {documents.map((document, index) => (
                    <ListItem
                      key={document._id || index}
                      style={{ cursor: "pointer" }}
                    >
                      <p
                        className="mb-0"
                        onClick={() => viewDocumentInTab(document)}
                      >
                        {document.fileName}
                      </p>
                      <Button
                        onClick={() => handleDeleteDocument(document._id || "")}
                      >
                        Delete
                      </Button>

                      <DocumentMagnifyingGlassIcon
                        style={{ width: 25 }}
                        onClick={() => viewDocumentInTab(document)}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </List>
          </TabPanel>
          <TabPanel>{load && <Email loadDetails={[load]} />}</TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};

export default LoadDetailsView;
