export type LoadDetail = {
      _id: string,
      loadNumber: string;
      truckObject: string;
      trailerObject: string;
      driverObject: string;
      pickupTime: string;
      deliveryTime: string;
      documents: string;
      price: string;
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
  };
  

  export type Truck = {
    _id: string;
    truckNumber: string;
    make: string;
    model: string;
    year: number;
    vin: string;
  };
  
  export type Trailer = {
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