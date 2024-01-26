import { DriverDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

async function GetAllDrivers(): Promise<DriverDetail[] | undefined> {
  try {
    const response = await fetch(`${api}/driverDetails`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch drivers: ${response.statusText}`);
    }

    const data: DriverDetail[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function CreateNewDriver(
  driver: DriverDetail
): Promise<DriverDetail | undefined> {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driver),
    };

    const response = await fetch(`${api}/driverDetails`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to create a new driver: ${response.statusText}`);
    }

    const newDriver: DriverDetail = await response.json();
    return newDriver;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function DeleteDriver(
  id: string
): Promise<DriverDetail | undefined> {
  try {
    const response = await fetch(`${api}/driverDetails/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete the driver: ${response.statusText}`);
    }

    const deletedDriver: DriverDetail = await response.json();
    return deletedDriver;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function UpdateDriver(
  driver: DriverDetail
): Promise<DriverDetail | undefined> {
  try {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driver),
    };

    const response = await fetch(
      `${api}/driverDetails/${driver._id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Failed to update the driver: ${response.statusText}`);
    }

    const updatedDriver: DriverDetail = await response.json();
    return updatedDriver;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default GetAllDrivers;
