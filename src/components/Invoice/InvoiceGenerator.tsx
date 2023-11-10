import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-AutoTable";
import { LoadDetail } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

interface InvoiceGeneratorProps {
  loadDetails: LoadDetail[];
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ loadDetails }) => {
  const generateInvoice = (load: LoadDetail) => {
    const doc = new jsPDF() as jsPDF & { autoTable: (options: any) => void };

    doc.setFontSize(11);
    doc.text(`FLEETWAVE`, 10, 15);

    // invoice info
    doc.text(`Invoice #: ${load.loadNumber}`, 180, 15, { align: "right" });
    doc.text(`Date: ${load.pickupTime}`, 180, 20, { align: "right" });
    doc.text(`Bill to: ${load.brokerInfo}`, 150, 35, { align: "right" });

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
        `$${parseFloat(load.detention).toFixed(2)}`,
      ],
    ];

    // set table margin
    let wantedTableWidth = 117;
    let pageWidth = doc.internal.pageSize.width;
    let margin = (pageWidth - wantedTableWidth) / 2;

    // table for driver and truck info
    doc.autoTable({
      startY: 45,
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
      startY: 65,
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
