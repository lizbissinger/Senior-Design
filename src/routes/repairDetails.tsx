import { RepairDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

export async function GetAllRepairs(): Promise<RepairDetail[] | undefined> {
  try {
    const response = await fetch(`${api}/repairs`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repairs: ${response.statusText}`);
      
    }

    const data: RepairDetail[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function CreateNewRepair(repair: RepairDetail): Promise<RepairDetail | undefined> {
  console.log("Createing new repair");
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(repair),
    };

    const response = await fetch(`${api}/repairs`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to create a new repair: ${response.statusText}`);
    }

    const newRepair: RepairDetail = await response.json();
    return newRepair;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function DeleteRepair(id: string): Promise<RepairDetail | undefined> {
  try {
    const response = await fetch(`${api}/repairDetails/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete the repair: ${response.statusText}`);
    }

    const deletedRepair: RepairDetail = await response.json();
    return deletedRepair;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// export async function UpdateRepair(repair: RepairDetail): Promise<RepairDetail | undefined> {
//   try {
//     const requestOptions = {
//       method: "PATCH",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(repair),
//     };

//     const response = await fetch(`${api}/repairDetails/${repair._id}`, requestOptions);

//     if (!response.ok) {
//       throw new Error(`Failed to update the repair: ${response.statusText}`);
//     }

//     const updatedRepair: RepairDetail = await response.json();
//     return updatedRepair;
//   } catch (error) {
//     console.error(error);
//     return undefined;
//   }
// }

export default GetAllRepairs;
