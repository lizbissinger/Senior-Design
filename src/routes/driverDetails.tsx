import { DriverDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

async function GetAllDrivers(): Promise<DriverDetail[] | undefined> {
  try {
    const response = await fetch(`${api}/driverDetails`, {
      method: "GET"
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
// export async function CreateNewLoad(load: DriverDetail) {
//     let newLoad;
//     const requestOptions = {
//         method: "POST",
//         headers: { 
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(load)
//     };
//     await fetch(`${api}/loadDetails`, requestOptions)
//         .then(response => response.json())
//         .then(data => newLoad = data);
//     return newLoad;
// }


export default GetAllDrivers;
