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

// Deleting a document by ID

export const deleteDocument = async (loadId: string, documentId: string) => {
  try {
    const response = await fetch(`${api}/loaddetails/${loadId}/documents/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error("Document could not be deleted");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

