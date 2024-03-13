import { LoadDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

async function GetAllLoads() {
  let loads;
  await fetch(`${api}/loadDetails`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      loads = data;
    })
    .catch((error) => console.log(error));
  return loads;
}

export async function CreateNewLoad(load: LoadDetail, files?: File[]) {
  const formData = new FormData();

  if (files) {
    files.forEach((file) => {
      formData.append("documents", file);
    });
  }

  (Object.keys(load) as Array<keyof LoadDetail>).forEach((key) => {
    if (key !== "documents") {
      // Excluding documents since it's handled separaetly
      // Excluding documents since it's handled separaetly
      const value = load[key];
      if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    }
  });

 
  
 

  const requestOptions: RequestInit = {
    method: "POST",
    body: formData,
  };

  try {
    
    const response = await fetch(`${api}/loadDetails`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating new load:", error);
    throw error;
  }
}

export async function DeleteLoad(id: string) {
  let deletedLoad;
  await fetch(`${api}/loadDetails/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => (deletedLoad = data));
  return deletedLoad;
}

export async function UpdateLoad(load: LoadDetail): Promise<LoadDetail> {
  const formData = new FormData();

  Object.keys(load).forEach((key) => {
    const typedKey = key as keyof LoadDetail;

    if (typedKey !== "documents") {
      const value = load[typedKey];
      formData.append(
        typedKey,
        typeof value === "object" && value !== null ? JSON.stringify(value) : String(value)
        typeof value === "object" && value !== null ? JSON.stringify(value) : String(value)
      );
    } else {
      const documents: File[] = load[typedKey] as unknown as File[];
      documents.forEach((document) => {
        formData.append("documents", document);
      });
    }
  });

  const requestOptions: RequestInit = {
    method: "PATCH",
    body: formData,
  };

  try {
    const url = `${api}/loadDetails/${load._id}`;
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating load:", error);
    throw error;
  }
}


export default GetAllLoads;
