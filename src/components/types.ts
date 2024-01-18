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
  };
  