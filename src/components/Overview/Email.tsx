import React, { useState } from "react";
import emailjs from "emailjs-com";
import { LoadDetail } from "../Types/types";
import EmailPreview from "./EmailPreview";
import { Card, Switch, TextInput } from "@tremor/react";
import { Button } from "react-bootstrap";

interface EmailProps {
  loadDetails: LoadDetail[];
}

interface SelectedDetails {
  loadNumber: boolean;
  truckObject: boolean;
  trailerObject: boolean;
  driverObject: boolean;
  [key: string]: boolean;
}

const Email: React.FC<EmailProps> = ({ loadDetails }) => {
  const [toEmail, setToEmail] = useState("randhars@mail.uc.edu");

  const [selectedDetails, setSelectedDetails] = useState<SelectedDetails>({
    loadNumber: true,
    truckObject: true,
    trailerObject: true,
    driverObject: true,
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const toggleDetailSelection = (detailType: string) => {
    setSelectedDetails((prev) => ({
      ...prev,
      [detailType]: !prev[detailType],
    }));
  };

  const generateEmailContent = () => {
    let emailContent = `
      <table>
        <thead>
          <tr>
            ${
              selectedDetails.loadNumber
                ? '<th style="text-align: left;">Load Number</th>'
                : ""
            }
            ${
              selectedDetails.truckObject
                ? '<th style="text-align: left;">Truck</th>'
                : ""
            }
            ${
              selectedDetails.trailerObject
                ? '<th style="text-align: left;">Trailer</th>'
                : ""
            }
            ${
              selectedDetails.driverObject
                ? '<th style="text-align: left;">Driver</th>'
                : ""
            }
          </tr>
        </thead>
        <tbody>
    `;

    loadDetails.forEach((load) => {
      emailContent += "<tr>";

      if (selectedDetails.loadNumber)
        emailContent += `<td>${load.loadNumber}</td>`;
      if (selectedDetails.truckObject)
        emailContent += `<td>${load.truckObject}</td>`;
      if (selectedDetails.trailerObject)
        emailContent += `<td>${load.trailerObject}</td>`;
      if (selectedDetails.driverObject)
        emailContent += `<td>${load.driverObject}</td>`;

      emailContent += "</tr>";
    });

    emailContent += `
        </tbody>
      </table>
    `;

    return emailContent;
  };

  const sendEmail = () => {
    if (loadDetails.length === 0) {
      console.log("Load details are empty. No email will be sent.");
      return;
    }

    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const confirmSendEmail = () => {
    const templateParams = {
      to_email: toEmail,
      to_name: "Broker",
      subject: "Load Details Email",
      load: loadDetails[0],
    };

    emailjs
      .send(
        "service_eiilq3e",
        "template_sljwaho",
        templateParams,
        "KTXShdv3dO99a0beZ"
      )
      .then((response: any) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error: any) => {
        console.error("Error sending email:", error);
      });

    setIsPreviewOpen(false);
  };

  const emailContent = generateEmailContent();

  return (
    <div>
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <label
            className="dark:text-dark-tremor-content-strong"
            htmlFor="loadNumber"
          >
            Load Number
          </label>
          <Switch
            id="loadNumber"
            checked={selectedDetails.loadNumber}
            onChange={() => toggleDetailSelection("loadNumber")}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <label
            className="dark:text-dark-tremor-content-strong"
            htmlFor="truckObject"
          >
            Truck
          </label>
          <Switch
            id="truckObject"
            checked={selectedDetails.truckObject}
            onChange={() => toggleDetailSelection("truckObject")}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <label
            className="dark:text-dark-tremor-content-strong"
            htmlFor="trailerObject"
          >
            Trailer
          </label>
          <Switch
            id="trailerObject"
            checked={selectedDetails.trailerObject}
            onChange={() => toggleDetailSelection("trailerObject")}
          />
        </div>
        <div className="flex items-center justify-between">
          <label
            className="dark:text-dark-tremor-content-strong"
            htmlFor="driverObject"
          >
            Driver
          </label>
          <Switch
            id="driverObject"
            checked={selectedDetails.driverObject}
            onChange={() => toggleDetailSelection("driverObject")}
          />
        </div>
      </Card>
      <TextInput
        className="mt-2"
        placeholder="Enter Broker's Email..."
        type="email"
        value={toEmail}
        onChange={(e) => setToEmail(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          className="mt-2 bg-tremor-primary text-white hover:bg-tremor-primary-dark py-1 px-2 rounded text-sm"
          onClick={sendEmail}
        >
          Send Update
        </Button>
      </div>
      {isPreviewOpen && (
        <EmailPreview
          emailContent={emailContent}
          onClose={closePreview}
          onSend={confirmSendEmail}
        />
      )}
    </div>
  );
};

export default Email;
