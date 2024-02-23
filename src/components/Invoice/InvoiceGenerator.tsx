import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { LoadDetail } from "../Types/types";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

interface InvoiceGeneratorProps {
  loadDetails: LoadDetail[];
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ loadDetails }) => {
  const generateInvoice = (load: LoadDetail) => {
    const doc = new jsPDF() as jsPDF & { autoTable: (options: any) => void };

    doc.setFontSize(11);

    doc.setTextColor(0, 0, 0);

    doc.text("LOGO?", 14, 15);

    doc.setTextColor(75, 75, 75);
    doc.setFontSize(30);
    doc.text("INVOICE", doc.internal.pageSize.width - 15, 20, {
      align: "right",
    });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    doc.text("FLEETWAVE", 14, 30);
    doc.text("2600 Clifton Ave.", 14, 35);
    doc.text("Cincinnati, OH 45221", 14, 40);
    doc.text("513-556-0000", 14, 45);

    doc.text(`Bill To: ${load.brokerInfo}`, 14, 55);
    doc.text("BROKER", 14, 60);
    doc.text("Cincinnati, OH XXXXX", 14, 65);
    doc.text("513-XXX-XXXX", 14, 70);

    const today = new Date();
    const formattedDate = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;

    doc.text(`Invoice #: ${load.loadNumber}`, 193, 30, { align: "right" });
    doc.text(`Invoice Date: ${formattedDate}`, 193, 35, { align: "right" });

    const tableWidth = 117;
    const pageWidth = doc.internal.pageSize.width;
    const margin = (pageWidth - tableWidth) / 2;

    doc.autoTable({
      startY: 77,
      theme: "grid",
      margin: { left: margin },
      styles: {
        fillColor: [0, 0, 0],
        align: "center",
      },
      columnStyles: {
        0: { halign: "left", cellWidth: 40, fillColor: [255, 255, 255] },
        1: { halign: "left", cellWidth: 40, fillColor: [255, 255, 255] },
        2: { halign: "left", cellWidth: 40, fillColor: [255, 255, 255] },
      },
      color: "black",
      head: [["Driver", "Truck", "Trailer"]],
      body: [[load.driverObject, load.truckObject, load.trailerObject]],
    });

    const pickupAddressParts = load.pickupLocation.split(", ");
    const deliveryAddressParts = load.deliveryLocation.split(", ");

    const pickupCityState = `${
      pickupAddressParts[pickupAddressParts.length - 3]
    }, ${pickupAddressParts[pickupAddressParts.length - 2]}`;
    const deliveryCityState = `${
      deliveryAddressParts[deliveryAddressParts.length - 3]
    }, ${deliveryAddressParts[deliveryAddressParts.length - 2]}`;

    const body = [
      [
        "Line Haul",
        `Load # ${load.loadNumber}`,
        `${pickupCityState} to ${deliveryCityState}`,
        `$${load.price}`,
      ],
    ];

    let totalAmount = parseFloat(load.price);

    if (load.detentionPrice) {
      body.push(["Detention", "", "", `$${load.detentionPrice}`]);
      totalAmount += parseFloat(load.detentionPrice);
    }

    body.push(["", "", "Total", `$${totalAmount.toFixed(2)}`]);

    doc.autoTable({
      startY: 97,
      theme: "grid",
      styles: {
        fillColor: [0, 0, 0],
        halign: "center",
      },
      columnStyles: {
        0: { halign: "left", cellWidth: 20, fillColor: [255, 255, 255] },
        1: { halign: "left", cellWidth: 70, fillColor: [255, 255, 255] },
        2: { halign: "left", cellWidth: 65, fillColor: [255, 255, 255] },
        3: { halign: "left", cellWidth: 25, fillColor: [255, 255, 255] },
      },
      fillColor: "black",
      head: [["Item", "Load #", "Description", "Amount"]],
      body: body,
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
            <div className="flex items-center">
              <DocumentArrowDownIcon className="w-6 ml-1 cursor-pointer" />
              <span className="text-xs mt-1">Invoice</span>
            </div>
          </span>
        </div>
      ))}
    </div>
  );
};

export default InvoiceGenerator;
