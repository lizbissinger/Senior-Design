import React from "react";

interface DriverDropdownProps {
  driverList: string[];
  selectedDriver: string;
  assignedDrivers: string[];
  onSelectDriver: (selectedDriver: string) => void;
}

const DriverDropdown: React.FC<DriverDropdownProps> = ({
  driverList,
  selectedDriver,
  assignedDrivers,
  onSelectDriver,
}) => {
  const filteredDrivers = driverList.filter(
    (driver) => !assignedDrivers.includes(driver)
  );

  return (
    <select
      value={selectedDriver}
      onChange={(e) => onSelectDriver(e.target.value)}
    >
      <option value="">Select a driver</option>
      {filteredDrivers.map((driver) => (
        <option key={driver} value={driver}>
          {driver}
        </option>
      ))}
    </select>
  );
};

export default DriverDropdown;
