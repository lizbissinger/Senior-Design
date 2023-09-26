import React from 'react';
import Overview from '../components/Overview';

export default {
  title: 'Components/Overview',
  component: Overview,
};

const Template = (args) => <Overview {...args} />;

export const DefaultView = Template.bind({});
DefaultView.args = {
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
EmptyView.args = {
  loadDetails: [],
};

export const EditMode = Template.bind({});
EditMode.args = {
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
CustomData.args = {
  loadDetails: [
    // Example:
    // {
    //   loadNumber: '789',
    //   truckObject: 'Truck 3',
    //   // Add other properties as needed
    // },
  ],
};
