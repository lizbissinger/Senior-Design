import React from "react";

interface TrailerDropdownProps {
  trailerList: string[];
  selectedTrailer: string;
  onSelectTrailer: (selectedTrailer: string) => void;
}

const TrailerDropdown: React.FC<TrailerDropdownProps> = ({
  trailerList,
  selectedTrailer,
  onSelectTrailer,
}) => {

  return (
    <select
      value={selectedTrailer}
      onChange={(e) => onSelectTrailer(e.target.value)}
    >
      <option value="">Select a trailer</option>
      {trailerList.map((trailer) => (
        <option key={trailer} value={trailer}>
          {trailer}
        </option>
      ))}
    </select>
  );
};

export default TrailerDropdown;
