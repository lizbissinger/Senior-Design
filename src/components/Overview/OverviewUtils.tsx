import GetAllLoads from "../../routes/loadDetails";
import GetAllDrivers from "../../routes/driverDetails";
import GetAllTrucks from "../../routes/truckDetails";
import GetAllTrailers from "../../routes/trailerDetails";
import { LoadDetail } from "../Types/types";

export const fetchAllLoads = async (): Promise<LoadDetail[]> => {
  const allLoads: any = await GetAllLoads();
  const loadsArr: LoadDetail[] = [];

  if (Array.isArray(allLoads)) {
    allLoads.forEach((element) => {
      let load: LoadDetail = JSON.parse(JSON.stringify(element));
      loadsArr.push(load);
    });
  }
  return loadsArr;
};

export const fetchDrivers = async (): Promise<string[]> => {
  try {
    const driverList = await GetAllDrivers();
    if (!driverList) {
      return [];
    }
    const driverNames = driverList.map((driver) => driver.name);
    return driverNames;
  } catch (error) {
    console.error("Failed to fetch drivers:", error);
    return [];
  }
};

export const fetchTrucks = async (): Promise<string[]> => {
  try {
    const truckList = await GetAllTrucks();
    return truckList ? truckList.map((truck) => truck.truckNumber) : [];
  } catch (error) {
    console.error("Failed to fetch trucks:", error);
    return [];
  }
};

export const fetchTrailers = async (): Promise<string[]> => {
  try {
    const trailerList = await GetAllTrailers();
    return trailerList
      ? trailerList.map((trailer) => trailer.trailerNumber)
      : [];
  } catch (error) {
    console.error("Failed to fetch trailers:", error);
    return [];
  }
};

export const calculateDistance = async (
  pickupLocation: string,
  deliveryLocation: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (pickupLocation && deliveryLocation) {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [pickupLocation],
          destinations: [deliveryLocation],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (
            status === "OK" &&
            response &&
            response.rows[0].elements[0].status === "OK"
          ) {
            const distanceMeters = response.rows[0].elements[0].distance.value;
            const distanceMiles = (distanceMeters * 0.000621371).toFixed(1);
            resolve(distanceMiles);
          } else {
            console.error("Failed to fetch distance:", status);
            reject("Failed to calculate distance");
          }
        }
      );
    } else {
      reject("Invalid locations");
    }
  });
};
