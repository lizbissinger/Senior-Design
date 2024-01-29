import React from "react";
import { Card, Flex, Metric, Text } from "@tremor/react";

interface StatusBarsProps {
  toDoCount: number;
  inProgressCount: number;
  completedCount: number;
}

const StatusBars: React.FC<StatusBarsProps> = ({
  toDoCount,
  inProgressCount,
  completedCount,
}) => {
  return (
    <div className="status-boxes">
      <Card className="max-w-xs" decoration="top" decorationColor="red">
        <Flex>
          <div>
            <Text>To Do</Text>
            <Metric>{toDoCount}</Metric>
          </div>
        </Flex>
      </Card>
      <Card className="max-w-xs" decoration="top" decorationColor="yellow">
        <Flex>
          <div>
            <Text>In Progress</Text>
            <Metric>{inProgressCount}</Metric>
          </div>
        </Flex>
      </Card>
      <Card className="max-w-xs" decoration="top" decorationColor="green">
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
