import { Fuel } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

export async function GetAllFuelRows(): Promise<Fuel[] | undefined> {
  try {
    const response = await fetch(`${api}/fuel`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Fuel rows: ${response.statusText}`);
      
    }

    const data: Fuel[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function CreateNewFuelRow(fuel: Fuel): Promise<Fuel | undefined> {
  console.log("Createing new fuel row");
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fuel),
    };

    const response = await fetch(`${api}/fuel`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to create a new fuel row: ${response.statusText}`);
    }

    const data: Fuel = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function UpdateFuel(fuel: Fuel): Promise<Fuel | undefined> {
  try {
    const requestOptions = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fuel),
    };

    const response = await fetch(`${api}/fuel/${fuel._id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to update the fuel: ${response.statusText}`);
    }

    const updatedFuel: Fuel = await response.json();
    return updatedFuel;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default GetAllFuelRows;
