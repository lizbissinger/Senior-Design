import { TrailerDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

async function GetAllTrailers(): Promise<TrailerDetail[] | undefined> {
  try {
    const response = await fetch(`${api}/trailerDetails`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch trailers: ${response.statusText}`);
    }

    const data: TrailerDetail[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}


export default GetAllTrailers;
