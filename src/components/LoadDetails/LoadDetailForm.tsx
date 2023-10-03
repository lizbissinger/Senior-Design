import React from 'react';

interface LoadDetailCardProps {
  loadNumber: string;
  truck: Truck;
  trailer: Trailer;
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
