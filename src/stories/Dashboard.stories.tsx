import React from 'react';
import Dashboard from '../components/Dashboard';

export default {
  title: 'Components/Dashboard',
  component: Dashboard,
};

const Template = (args) => <Dashboard {...args} />;

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
