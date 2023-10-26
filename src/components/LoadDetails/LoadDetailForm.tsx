import React from "react";

interface LoadDetailCardProps {
  loadNumber: string;
  truck: any;
  trailer: any;
}

const LoadDetailCard: React.FC<LoadDetailCardProps> = ({
  loadNumber,
  truck,
  trailer,
}) => {
  return (
    <div className="load-detail-card">
      <h2>Load Number: {loadNumber}</h2>
      <p>Truck: {truck.name}</p>
      <p>Trailer: {trailer.name}</p>
      {/* Display other load details here */}
    </div>
  );
};

export default LoadDetailCard;
