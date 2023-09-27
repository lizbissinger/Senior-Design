import React from 'react';

interface DriverDropdownProps {
  driverList: string[];
  selectedDriver: string;
  onSelectDriver: (driver: string) => void;
}

const DriverDropdown: React.FC<DriverDropdownProps> = ({
  driverList,
  selectedDriver,
  onSelectDriver,
}) => {
  const handleDriverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectDriver(e.target.value);
  };

  return (
    <div>
      <select value={selectedDriver} onChange={handleDriverChange}>
        <option value="">Select Driver</option>
        {driverList.map((driver) => (
          <option key={driver} value={driver}>
            {driver}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DriverDropdown;
