import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-AutoTable";
import { LoadDetail } from "../Types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

interface InvoiceGeneratorProps {
  loadDetails: LoadDetail[];
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ loadDetails }) => {
  const generateInvoice = (load: LoadDetail) => {
    const doc = new jsPDF() as jsPDF & { autoTable: (options: any) => void };

    doc.setFontSize(11);
    doc.text(`LOGO?`, 14, 15);

    doc.setTextColor(128, 128, 128); // Gray color
    doc.setFontSize(30);
    doc.text("INVOICE", doc.internal.pageSize.width - 15, 20, { align: "right" });
    doc.setTextColor(0, 0, 0); // Reset to black
    doc.setFontSize(11);

    // Address on the left side
    doc.text(`FLEETWAVE`, 14, 30);
    doc.text("2600 Clifton Ave.", 14, 35);
    doc.text("Cincinnati, OH 45221", 14, 40);
    doc.text("513-556-0000", 14, 45);

    doc.text(`Bill To: ${load.brokerInfo}`, 14, 55);
    doc.text("BROKER", 14, 60);
    doc.text("Cincinnati, OH XXXXX", 14, 65);
    doc.text("513-XXX-XXXX", 14, 70);
  
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    // invoice info
    doc.text(`Invoice #: ${load.loadNumber}`, 193, 30, { align: "right" });
    doc.text(`Date: ${formattedDate}`, 193, 35, { align: "right" });
    

    const tableData = [
      [
        "Load #",
        "Truck #",
        "Trailer #",
        "Driver Name",
        "Pick-up Time",
        "Delivery Time",
        "Price",
        "Detention",
      ],
      [
        load.loadNumber,
        load.truckObject,
        load.trailerObject,
        load.driverObject,
        load.pickupTime,
        load.deliveryTime,
        `$${parseFloat(load.price).toFixed(2)}`,
        `$${parseFloat(load.detentionPrice).toFixed(2)}`,
      ],
    ];

    // set table margin
    let wantedTableWidth = 117;
    let pageWidth = doc.internal.pageSize.width;
    let margin = (pageWidth - wantedTableWidth) / 2;

    // table for driver and truck info
    doc.autoTable({
      startY: 77,
      theme: "grid",
      margin: { left: margin },
      styles: {
        fillColor: [0, 0, 0],
        align: "center",
      },
      columnStyles: {
        0: {
          halign: "left",
          cellWidth: 40,
          fillColor: [255, 255, 255],
        },
        1: {
          halign: "left",
          cellWidth: 40,
          fillColor: [255, 255, 255],
        },
        2: {
          halign: "left",
          cellWidth: 40,
          fillColor: [255, 255, 255],
        },
      },
      color: "black",
      head: [["Driver", "Truck", "Trailer"]],
      body: [[load.driverObject, load.truckObject, load.trailerObject]],
    });

    // table for load info
    doc.autoTable({
      startY: 97,
      theme: "grid",
      styles: {
        fillColor: [0, 0, 0],
        halign: "center",
      },
      columnStyles: {
        0: {
          halign: "left",
          cellWidth: 20,
          fillColor: [255, 255, 255],
        },
        1: {
          halign: "left",
          cellWidth: 70,
          cellLength: 20,
          fillColor: [255, 255, 255],
        },
        2: {
          halign: "left",
          cellWidth: 65,
          fillColor: [255, 255, 255],
        },
        3: {
          halign: "left",
          cellWidth: 25,
          fillColor: [255, 255, 255],
        },
      },
      fillColor: "black",
      head: [["Item", "Load #", "Description", "Amount"]],
      body: [
        ["Line Haul", `${load.loadNumber}`, , `$${load.price}`],
        ["", "", "Total", `$${load.price}`],
      ],
    });

    doc.save(`FleetWave - Invoice - Load ${load.loadNumber}.pdf`);
  };

  return (
    <div>
      {loadDetails.map((load) => (
        <div key={load.loadNumber}>
          <span
            onClick={() => generateInvoice(load)}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faFilePdf} /> Invoice
          </span>
        </div>
      ))}
    </div>
  );
};

export default InvoiceGenerator;
