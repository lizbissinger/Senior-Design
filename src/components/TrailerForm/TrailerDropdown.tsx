import React from "react";

interface TrailerDropdownProps {
  trailerList: string[];
  selectedTrailer: string;
  assignedTrailers: string[];
  onSelectTrailer: (selectedTrailer: string) => void;
}

const TrailerDropdown: React.FC<TrailerDropdownProps> = ({
  trailerList,
  selectedTrailer,
  assignedTrailers,
  onSelectTrailer,
}) => {
  const filteredTrailers = trailerList.filter(
    (trailer) => !assignedTrailers.includes(trailer)
  );

  return (
    <select
      value={selectedTrailer}
      onChange={(e) => onSelectTrailer(e.target.value)}
    >
      <option value="">Select a trailer</option>
      {filteredTrailers.map((trailer) => (
        <option key={trailer} value={trailer}>
          {trailer}
        </option>
      ))}
    </select>
  );
};

export default TrailerDropdown;
