const api = import.meta.env.VITE_API_URL;

async function GetAllRevenueReports() {
  try {
    const response = await fetch(`${api}/reports/allRevenue`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reports: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function GetDriverRevenueReports(driver: string) {
  try {
    const response = await fetch(`${api}/reports/driverRevenue?driver=${driver}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reports: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default GetAllRevenueReports;
