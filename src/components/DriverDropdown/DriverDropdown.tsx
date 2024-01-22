// DriverDropdown.tsx

import React from 'react';

interface DriverDropdownProps {
    driverList: string[];
    selectedDriver: string;
    onSelectDriver: (selectedDriver: string) => void;
}

const DriverDropdown: React.FC<DriverDropdownProps> = ({ driverList, selectedDriver, onSelectDriver }) => {
    return (
        <select
            value={selectedDriver}
            onChange={(e) => onSelectDriver(e.target.value)}
        >
            <option value="">Select a driver</option>
            {driverList.map(driver => (
                <option key={driver} value={driver}>
                    {driver}
                </option>
            ))}
        </select>
    );
};

export default DriverDropdown;
