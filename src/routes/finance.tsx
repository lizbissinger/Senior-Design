const api = import.meta.env.VITE_API_URL;

async function GetRevenue(
  groupBy: string,
  driver?: string,
  truck?: string,
  dateRange?: any
) {
  try {
    const from = dateRange?.from ? dateRange.from : null;
    const to = dateRange?.to ? dateRange.to : null;
    const _driver = driver != null && driver?.length > 0 ? driver : null;
    const _truck = truck != null && truck?.length > 0 ? truck : null;

    const response = await fetch(
      `${api}/finance/revenue?groupBy=${groupBy}&driver=${_driver}&truck=${_truck}&from=${from}&to=${to}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default GetRevenue;
