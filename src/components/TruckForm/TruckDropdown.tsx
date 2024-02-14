import React from "react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";

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
  const handleSelectChange = (selectedValue: string) => {
    onSelectTruck(selectedValue);
  };

  return (
    <SearchSelect
      value={selectedTruck}
      onValueChange={handleSelectChange}
      placeholder="Select a truck"
    >
      <SearchSelectItem value="" />
      {truckList.map((truck) => (
        <SearchSelectItem key={truck} value={truck}>
          {truck}
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
};

export default TruckDropdown;
