import React from "react";
import Dashboard from "../components/Dashboard";
import { JSX } from "react/jsx-runtime";

export default {
  title: "Components/Dashboard",
  component: Dashboard,
};

const Template = (args: JSX.IntrinsicAttributes) => <Dashboard {...args} />;

export const DefaultView = Template.bind({});
DefaultView.arguments = {
  loadDetails: [
    // Example:
    // {
    //   loadNumber: '123',
    //   truckObject: 'Truck 1',
    //   // Add other properties as needed
    // },
  ],
};
