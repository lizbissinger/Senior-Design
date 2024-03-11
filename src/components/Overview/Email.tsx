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
  const [toEmail, setToEmail] = useState("");
  const [comment, setComment] = useState("");

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
    const listItems = loadDetails
      .map((load) => {
        const loadDetailsContent = `
          ${
            selectedDetails.loadNumber
              ? `<strong>Load Number:</strong> ${load.loadNumber}`
              : ""
          }
          ${
            selectedDetails.truckObject
              ? `<br><strong>Truck:</strong> ${load.truckObject}`
              : ""
          }
          ${
            selectedDetails.trailerObject
              ? `<br><strong>Trailer:</strong> ${load.trailerObject}`
              : ""
          }
          ${
            selectedDetails.driverObject
              ? `<br><strong>Driver:</strong> ${load.driverObject}`
              : ""
          }
          ${
            selectedDetails.status
              ? `<br><strong>Status:</strong> ${load.status}`
              : ""
          }
          ${comment ? `<br><strong>Comment:</strong> ${comment}` : ""}
        `;
        return `<li>${loadDetailsContent}</li>`;
      })
      .join("");

    const emailContent = `
      <ul style="list-style-type: none; padding: 0;">
        ${listItems}
      </ul>
    `;

    return emailContent.replace(/\n/g, "");
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
      to_content: emailContent,
      to_name: "Broker",
      subject: "Load Details Email",
      load: loadDetails[0],
      is_html: true,
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
        <div className="flex items-center text-sm justify-between mb-2">
          <label
            className="dark:text-dark-tremor-content-strong"
            htmlFor="loadNumber"
          >
            Load Number
          </label>
          <Switch
            id="loadNumber"
            checked={selectedDetails.loadNumber}
            color={"#6686DC"}
            onChange={() => toggleDetailSelection("loadNumber")}
          />
        </div>
        <div className="flex items-center text-sm justify-between mb-2">
          <label
            className="dark:text-dark-tremor-content-strong"
            htmlFor="truckObject"
          >
            Truck
          </label>
          <Switch
            id="truckObject"
            checked={selectedDetails.truckObject}
            color={"#6686DC"}
            onChange={() => toggleDetailSelection("truckObject")}
          />
        </div>
        <div className="flex items-center text-sm justify-between mb-2">
          <label
            className="dark:text-dark-tremor-content-strong"
            htmlFor="trailerObject"
          >
            Trailer
          </label>
          <Switch
            id="trailerObject"
            checked={selectedDetails.trailerObject}
            color={"#6686DC"}
            onChange={() => toggleDetailSelection("trailerObject")}
          />
        </div>
        <div className="flex items-center text-sm justify-between mb-2">
          <label
            className="dark:text-dark-tremor-content-strong"
            htmlFor="driverObject"
          >
            Driver
          </label>
          <Switch
            id="driverObject"
            checked={selectedDetails.driverObject}
            color={"#6686DC"}
            onChange={() => toggleDetailSelection("driverObject")}
          />
        </div>
        <div className="flex items-center text-sm justify-between">
          <label
            className="dark:text-dark-tremor-content-strong"
            htmlFor="status"
          >
            Status
          </label>
          <Switch
            id="status"
            checked={selectedDetails.status}
            color={"#6686DC"}
            onChange={() => toggleDetailSelection("status")}
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
      <TextInput
        className="mt-2"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          className="mt-2 !bg-[#779BFB] text-white hover:!bg-[#6686DC] py-1 px-2 rounded text-sm dark:!bg-[#6686DC] dark:!text-black dark:hover:!bg-[#779BFB]"
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
