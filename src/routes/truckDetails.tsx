import { TruckDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

async function GetAllTrucks(): Promise<TruckDetail[] | undefined> {
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


export default GetAllTrucks;
