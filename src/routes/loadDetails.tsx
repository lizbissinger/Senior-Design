import { LoadDetail, CustomFile} from "../components/Types/types";

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
      // Ensure you're appending the actual File object here
      formData.append("documents", file.file); // Assuming the actual file is under the 'file' property
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
export async function UpdateLoad(load: LoadDetail): Promise<LoadDetail> {
  const formData = new FormData();

  Object.keys(load).forEach((key) => {
    const typedKey = key as keyof LoadDetail;

    if (typedKey !== "documents") {
      const value = load[typedKey];
      formData.append(
        typedKey,
        typeof value === "object" && value !== null ? JSON.stringify(value) : String(value)
      );
    } else {
      // Assuming `documents` is an array of `CustomFile` and each `CustomFile` has a `file` property
      const documents: CustomFile[] = load[typedKey] as unknown as CustomFile[];
      documents.forEach((document) => {
        // Append the actual File object
        formData.append("documents", document.file);
      });
    }
  });

  // Debugging: Log FormData entries
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

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
