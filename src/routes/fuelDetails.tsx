import { FuelDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

export async function GetAllFuel(): Promise<FuelDetail[] | undefined> {
    try {
        const response = await fetch(`${api}/fuel`, {
            method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Fuel: ${response.statusText}`);
      
    }

    const data: FuelDetail[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function CreateNewFuelLog(Fuellog: FuelDetail): Promise<FuelDetail | undefined> {
  console.log("Createing new Fuellog");
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Fuellog),
    };

    const response = await fetch(`${api}/fuel`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to create a new FuelLog: ${response.statusText}`);
    }

    const newFuelLog: FuelDetail = await response.json();
    return newFuelLog;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function DeleteFuelLog(id: string): Promise<FuelDetail | undefined> {
  try {
    const response = await fetch(`${api}/fuel/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete the FuelLog: ${response.statusText}`);
    }

    const deletedFuelLog: FuelDetail = await response.json();
    return deletedFuelLog;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}



export default GetAllFuel;
