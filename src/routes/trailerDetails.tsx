import { TrailerDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

export async function GetAllTrailers(): Promise<TrailerDetail[] | undefined> {
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

export async function CreateNewTrailer(trailer: TrailerDetail): Promise<TrailerDetail | undefined> {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trailer),
    };

    const response = await fetch(`${api}/trailerDetails`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to create a new trailer: ${response.statusText}`);
    }

    const newTrailer: TrailerDetail = await response.json();
    return newTrailer;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function DeleteTrailer(id: string): Promise<TrailerDetail | undefined> {
  try {
    const response = await fetch(`${api}/trailerDetails/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete the trailer: ${response.statusText}`);
    }

    const deletedTrailer: TrailerDetail = await response.json();
    return deletedTrailer;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function UpdateTrailer(trailer: TrailerDetail): Promise<TrailerDetail | undefined> {
  try {
    const requestOptions = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trailer),
    };

    const response = await fetch(`${api}/trailerDetails/${trailer._id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to update the trailer: ${response.statusText}`);
    }

    const updatedTrailer: TrailerDetail = await response.json();
    return updatedTrailer;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default GetAllTrailers;
