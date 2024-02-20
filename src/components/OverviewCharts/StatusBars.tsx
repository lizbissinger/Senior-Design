import React, { useState, useEffect } from "react";
import { Card, DateRangePickerValue, Flex, Metric, Text } from "@tremor/react";
import "./StatusBars.css";

interface StatusBarsProps {
  toDoCount: number;
  inProgressCount: number;
  completedCount: number;
  filteredToDoCount: number;
  filteredInProgressCount: number;
  filteredCompletedCount: number;
  onStatusClick: (status: string) => void;
}

const StatusBars: React.FC<{
  toDoCount: number;
  inProgressCount: number;
  completedCount: number;
  filteredToDoCount: number;
  filteredInProgressCount: number;
  filteredCompletedCount: number;
  onStatusClick: (status: string) => void;
  onDateRangeChange: (value: DateRangePickerValue) => void;
}> = ({
  toDoCount,
  inProgressCount,
  completedCount,
  filteredToDoCount,
  filteredInProgressCount,
  filteredCompletedCount,
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
  }, [toDoCount, inProgressCount, completedCount]);

  return (
    <div className="status-boxes">
      <Card
        className={`max-w-xs status-bar ${
          activeStatus === "To-Do" ? "status-bar-active" : ""
        }`}
        decoration="top"
        decorationColor="red"
        onClick={() => handleStatusClick("To-Do")}
      >
        <Flex>
          <div className="center-text align-p">
            <Text className="align-p">To Do</Text>
            <Metric className="align-p">{filteredToDoCount}</Metric>
          </div>
        </Flex>
      </Card>
      <Card
        className={`max-w-xs status-bar ${
          activeStatus === "In Progress" ? "status-bar-active" : ""
        }`}
        decoration="top"
        decorationColor="yellow"
        onClick={() => handleStatusClick("In Progress")}
      >
        <Flex>
          <div className="center-text">
            <Text>In Progress</Text>
            <Metric>{filteredInProgressCount}</Metric>
          </div>
        </Flex>
      </Card>
      <Card
        className={`max-w-xs status-bar ${
          activeStatus === "Completed" ? "status-bar-active" : ""
        }`}
        decoration="top"
        decorationColor="green"
        onClick={() => handleStatusClick("Completed")}
      >
        <Flex>
          <div className="center-text align-p">
            <Text className="align-p">Completed</Text>
            <Metric className="align-p">{filteredCompletedCount}</Metric>
          </div>
        </Flex>
      </Card>
    </div>
  );
};

export default StatusBars;
