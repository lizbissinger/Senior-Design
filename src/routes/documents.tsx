const api = import.meta.env.VITE_API_URL;

export const fetchDocuments = async (loadId: string) => {
  try {
    const response = await fetch(`${api}/loaddetails/${loadId}/documents`);
    if (!response.ok) {
      throw new Error("Documents could not be fetched");
    }
    const data = await response.json();
    return data.documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
};
