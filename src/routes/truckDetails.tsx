import { TruckDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

export async function GetAllTrucks(): Promise<TruckDetail[] | undefined> {
  try {
    const response = await fetch(`${api}/truckDetails`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch trucks: ${response.statusText}`);
    }

    const data: TruckDetail[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function CreateNewTruck(truck: TruckDetail): Promise<TruckDetail | undefined> {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(truck),
    };

    const response = await fetch(`${api}/truckDetails`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to create a new truck: ${response.statusText}`);
    }

    const newTruck: TruckDetail = await response.json();
    return newTruck;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function DeleteTruck(id: string): Promise<TruckDetail | undefined> {
  try {
    const response = await fetch(`${api}/truckDetails/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete the truck: ${response.statusText}`);
    }

    const deletedTruck: TruckDetail = await response.json();
    return deletedTruck;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function UpdateTruck(truck: TruckDetail): Promise<TruckDetail | undefined> {
  try {
    const requestOptions = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(truck),
    };

    const response = await fetch(`${api}/truckDetails/${truck._id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to update the truck: ${response.statusText}`);
    }

    const updatedTruck: TruckDetail = await response.json();
    return updatedTruck;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default GetAllTrucks;
