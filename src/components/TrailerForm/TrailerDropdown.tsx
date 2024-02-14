import React from "react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";

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
  const handleSelectChange = (selectedValue: string) => {
    onSelectTrailer(selectedValue);
  };

  return (
    <SearchSelect
      value={selectedTrailer}
      onValueChange={handleSelectChange}
      placeholder="Select a trailer"
    >
      <SearchSelectItem value="" />
      {trailerList.map((trailer) => (
        <SearchSelectItem key={trailer} value={trailer}>
          {trailer}
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
};

export default TrailerDropdown;
