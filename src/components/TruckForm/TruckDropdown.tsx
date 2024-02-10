import React from "react";

interface TruckDropdownProps {
  truckList: string[];
  selectedTruck: string;
  assignedTrucks: string[];
  onSelectTruck: (selectedTruck: string) => void;
}

const TruckDropdown: React.FC<TruckDropdownProps> = ({
  truckList,
  selectedTruck,
  assignedTrucks,
  onSelectTruck,
}) => {
  const filteredTrucks = truckList.filter(
    (truck) => !assignedTrucks.includes(truck)
  );

  return (
    <select
      value={selectedTruck}
      onChange={(e) => onSelectTruck(e.target.value)}
    >
      <option value="">Select a truck</option>
      {filteredTrucks.map((truck) => (
        <option key={truck} value={truck}>
          {truck}
        </option>
      ))}
    </select>
  );
};

export default TruckDropdown;
