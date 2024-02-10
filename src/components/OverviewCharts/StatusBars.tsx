import React from "react";
import { Card, Flex, Metric, Text } from "@tremor/react";

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
  return (
    <div className="status-boxes">
      <Card
        className="max-w-xs"
        decoration="top"
        decorationColor="red"
        onClick={() => onStatusClick("To-Do")}
      >
        <Flex>
          <div>
            <Text>To Do</Text>
            <Metric>{toDoCount}</Metric>
          </div>
        </Flex>
      </Card>
      <Card
        className="max-w-xs"
        decoration="top"
        decorationColor="yellow"
        onClick={() => onStatusClick("In Progress")}
      >
        <Flex>
          <div>
            <Text>In Progress</Text>
            <Metric>{inProgressCount}</Metric>
          </div>
        </Flex>
      </Card>
      <Card
        className="max-w-xs"
        decoration="top"
        decorationColor="green"
        onClick={() => onStatusClick("Completed")}
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
