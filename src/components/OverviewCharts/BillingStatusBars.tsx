import React, { useState, useEffect } from "react";
import { Card, DateRangePickerValue, Flex, Metric, Text } from "@tremor/react";
import "./BillingStatusBars.css";

interface BillingStatusBarsProps {
  notInvoicedCount: number;
  invoicedCount: number;
  receivedPaymentCount: number;
  filteredNotInvoicedCount: number;
  filteredInvoicedCount: number;
  filteredReceivedPaymentCount: number;
  onStatusClick: (status: string) => void;
  onDateRangeChange: (value: DateRangePickerValue) => void;
}

const BillingStatusBars: React.FC<BillingStatusBarsProps> = ({
  notInvoicedCount,
  invoicedCount,
  receivedPaymentCount,
  filteredNotInvoicedCount,
  filteredInvoicedCount,
  filteredReceivedPaymentCount,
  onStatusClick,
  onDateRangeChange,
}) => {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  const handleStatusClick = (status: string) => {
    if (activeStatus === status) {
      setActiveStatus(null);
      onStatusClick("");
    } else {
      setActiveStatus(status);
      onStatusClick(status);
    }
  };

  const handleDateRangeChange = (value: DateRangePickerValue) => {
    onDateRangeChange(value);
  };

  useEffect(() => {
    setActiveStatus(null);
  }, [notInvoicedCount, invoicedCount, receivedPaymentCount]);

  return (
    <div className="billing-status-boxes">
      <Card
        className={`max-w-xs billing-status-bar ${
          activeStatus === "Not Invoiced" ? "status-bar-active" : ""
        }`}
        decoration="top"
        decorationColor="orange"
        onClick={() => handleStatusClick("Not Invoiced")}
      >
        <Flex>
          <div>
            <Text>Not Invoiced</Text>
            <Metric>{filteredNotInvoicedCount}</Metric>
          </div>
        </Flex>
      </Card>

      <Card
        className={`max-w-xs billing-status-bar ${
          activeStatus === "Invoiced" ? "status-bar-active" : ""
        }`}
        decoration="top"
        decorationColor="cyan"
        onClick={() => handleStatusClick("Invoiced")}
      >
        <Flex>
          <div>
            <Text>Invoiced</Text>
            <Metric>{filteredInvoicedCount}</Metric>
          </div>
        </Flex>
      </Card>

      <Card
        className={`max-w-xs billing-status-bar ${
          activeStatus === "Received Payment" ? "status-bar-active" : ""
        }`}
        decoration="top"
        decorationColor="purple"
        onClick={() => handleStatusClick("Received Payment")}
      >
        <Flex>
          <div>
            <Text>Received Payment</Text>
            <Metric>{filteredReceivedPaymentCount}</Metric>
          </div>
        </Flex>
      </Card>
    </div>
  );
};

export default BillingStatusBars;
