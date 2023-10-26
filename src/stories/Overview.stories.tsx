import React from "react";
import Overview from "../components/Overview/Overview";
import { JSX } from "react/jsx-runtime";

export default {
  title: "Components/Overview",
  component: Overview,
};

const Template = (args: JSX.IntrinsicAttributes) => <Overview {...args} />;

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

export const EmptyView = Template.bind({});
EmptyView.arguments = {
  loadDetails: [],
};

export const EditMode = Template.bind({});
EditMode.arguments = {
  loadDetails: [
    // Example:
    // {
    //   loadNumber: '456',
    //   truckObject: 'Truck 2',
    //   // Add other properties as needed
    // },
  ],
  isEditMode: true,
};

export const CustomData = Template.bind({});
CustomData.arguments = {
  loadDetails: [
    // Example:
    // {
    //   loadNumber: '789',
    //   truckObject: 'Truck 3',
    //   // Add other properties as needed
    // },
  ],
};
