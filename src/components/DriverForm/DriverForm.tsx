import React, { useState } from 'react';

interface DriverFormProps {
  onAddDriver: (driver: string) => void;
}

const DriverForm: React.FC<DriverFormProps> = ({ onAddDriver }) => {
  const [newDriver, setNewDriver] = useState('');

  const handleAddDriver = () => {
    if (newDriver.trim()) {
      onAddDriver(newDriver);
      setNewDriver('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add new driver"
        value={newDriver}
        onChange={(e) => setNewDriver(e.target.value)}
      />
      <button onClick={handleAddDriver}>Add Driver</button>
    </div>
  );
};

export default DriverForm;
