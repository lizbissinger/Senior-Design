import React from 'react';

interface LoadDetail {
    loadNumber: string;
    truckObject: string;
    trailerObject: string;
    driverObject: string;
    pickupTime: string;
    deliveryTime: string;
    documents: string;
    price: string;
    detention: string;
    allMiles: string;
    gallons: string;
    status: string;
    brokerInfo: {
      name: string;
      phoneNumber: string;
      email: string;
      company: string;
    };
    comments: string;
  }

interface InvoiceGeneratorProps {
  loadDetails: LoadDetail[];
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ loadDetails }) => {
  const generateInvoice = () => {
    
    const invoiceData = loadDetails.map((load) => ({
      loadNumber: load.loadNumber,
      price: parseFloat(load.price), 
      
    }));

    
    const totalAmount = invoiceData.reduce((sum, load) => sum + load.price, 0);

    
    const invoice = {
      invoiceData,
      totalAmount,
      
    };

    return invoice;
  };

  const invoice = generateInvoice();

  return (
    <div className="invoice-container">
      <h2>Generated Invoice</h2>
      {/* Display the invoice data here */}
      <p>Total Amount: ${invoice.totalAmount}</p>
      {/* You can format and display the invoice data as needed */}
    </div>
  );
};

export default InvoiceGenerator;
