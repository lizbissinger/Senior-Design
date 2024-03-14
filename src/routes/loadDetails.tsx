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

export async function UpdateLoad(load: LoadDetail) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(load),
  };
  return await fetch(`${api}/loadDetails/${load._id}`, requestOptions).then(
    (response) => response.json()
  );
}

export default GetAllLoads;
