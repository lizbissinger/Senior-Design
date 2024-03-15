import { LoadDetail, CustomFile } from "../components/Types/types";

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

export async function CreateNewLoad(load: LoadDetail, files?: CustomFile[]) {
  const formData = new FormData();

  if (files) {
    files.forEach((file) => {
      formData.append("documents", file.file);
    });
  }

  for (const key in load) {
    if (
      Object.prototype.hasOwnProperty.call(load, key) &&
      key !== "documents"
    ) {
      const value = load[key as keyof LoadDetail];
      if (typeof value === "number" && !isNaN(value)) {
        formData.append(key, String(value));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString()); // Convert other values to strings
      } else {
        formData.append(key, "-"); // Convert null or undefined values to "-"
      }
    }
  }
  // console.log("FormData:");
  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }

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

export async function UpdateLoad(load: LoadDetail, files?: CustomFile[]) {
  const formData = new FormData();

  if (files) {
    files.forEach((file) => {
      formData.append("documents", file.file);
    });
  }

  for (const key in load) {
    if (
      Object.prototype.hasOwnProperty.call(load, key) &&
      key !== "documents"
    ) {
      const value = load[key as keyof LoadDetail];
      if (value !== null && value !== undefined) {
        if (typeof value === "number" && !isNaN(value)) {
          formData.append(key, String(value));
        } else {
          formData.append(key, value.toString());
        }
      }
    }
  }

  console.log("FormData:");
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const requestOptions: RequestInit = {
    method: "PATCH",
    body: formData,
  };

  try {
    const response = await fetch(
      `${api}/loadDetails/${load._id}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating load:", error);
    throw error;
  }
}

export default GetAllLoads;
