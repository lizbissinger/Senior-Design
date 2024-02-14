import React from "react";

interface TruckDropdownProps {
  truckList: string[];
  selectedTruck: string;
  onSelectTruck: (selectedTruck: string) => void;
}

const TruckDropdown: React.FC<TruckDropdownProps> = ({
  truckList,
  selectedTruck,
  onSelectTruck,
}) => {

  return (
    <select
      value={selectedTruck}
      onChange={(e) => onSelectTruck(e.target.value)}
    >
      <option value="">Select a truck</option>
      {truckList.map((truck) => (
        <option key={truck} value={truck}>
          {truck}
        </option>
      ))}
    </select>
  );
};

export default TruckDropdown;
