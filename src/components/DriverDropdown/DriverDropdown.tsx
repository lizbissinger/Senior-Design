import React from "react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";

interface DriverDropdownProps {
  driverList: string[];
  selectedDriver: string;
  onSelectDriver: (selectedDriver: string) => void;
}

const DriverDropdown: React.FC<DriverDropdownProps> = ({
  driverList,
  selectedDriver,
  onSelectDriver,
}) => {
  const handleSelectChange = (selectedValue: string) => {
    onSelectDriver(selectedValue);
  };

  return (
    <SearchSelect
      value={selectedDriver}
      onValueChange={handleSelectChange}
      placeholder="Select a driver"
    >
      <SearchSelectItem value="" />
      {driverList.map((driver) => (
        <SearchSelectItem key={driver} value={driver} />
      ))}
    </SearchSelect>
  );
};

export default DriverDropdown;
