export type LoadDetail = {
  _id: string;
  loadNumber: string;
  truckObject: string;
  trailerObject: string;
  driverObject: string;
  pickupTime: string;
  deliveryTime: string;
  pickupLocation: string;
  deliveryLocation: string;
  documents: string;
  price: string;
  detention: string;
  detentionPrice: string;
  allMiles: string;
  fuelGallons: string;
  status: string;
  brokerInfo: {
    name: string;
    phoneNumber: string;
    email: string;
    company: string;
  };
  comments: string;
  createdAt: string;
  updatedAt: string;
};

export type TruckDetail = {
  _id: string;
  truckNumber: string;
  make: string;
  model: string;
  year: number;
  vin: string;
};

export type TrailerDetail = {
  _id: string;
  trailerNumber: string;
  make: string;
  model: string;
  year: number;
  vin: string;
};

export type DriverDetail = {
  _id: string;
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
};

export type VehiclesDetailsTableProps = {
  drivers: DriverDetail[];
  trucks: TruckDetail[];
  trailers: TrailerDetail[];
};

export type RepairDetail = {
  _id: string;
  repair: string;
  truckObject: string;
  trailerObject: string;
  repairDate: string;
  repairCost: string;
  repairComments: string;
};


export type PayrollDetail = {
  _id: string;
  driver: string;
  payrollDate: string;
  payrollCost: string;
 
};