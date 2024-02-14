import React, { useState } from "react";
import { Card, Flex, Metric, Text } from "@tremor/react";
import "./StatusBars.css";

interface StatusBarsProps {
  toDoCount: number;
  inProgressCount: number;
  completedCount: number;
  onStatusClick: (status: string) => void;
}

const StatusBars: React.FC<StatusBarsProps> = ({
  toDoCount,
  inProgressCount,
  completedCount,
  onStatusClick,
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
          <div>
            <Text>To Do</Text>
            <Metric>{toDoCount}</Metric>
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
          <div>
            <Text>In Progress</Text>
            <Metric>{inProgressCount}</Metric>
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
          <div>
            <Text>Completed</Text>
            <Metric>{completedCount}</Metric>
          </div>
        </Flex>
      </Card>
    </div>
  );
};

export default StatusBars;
