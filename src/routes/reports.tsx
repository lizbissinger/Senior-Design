const api = import.meta.env.VITE_API_URL;

async function GetAllRevenueData(driver?: string, dateRange?: any) {
  try {
    const from = dateRange?.from ? dateRange.from : null;
    const to = dateRange?.to ? dateRange.to : null;
    const _driver = (driver != null && driver?.length > 0) ? driver : null;

    const response = await fetch(`${api}/reports/allRevenue?driver=${_driver}&from=${from}&to=${to}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export async function GetRevenuePerMileData(driver?: string, dateRange?: any) {
  try {
    const from = dateRange?.from ? dateRange.from : null;
    const to = dateRange?.to ? dateRange.to : null;
    const _driver = (driver != null && driver?.length > 0) ? driver : null;

    const response = await fetch(`${api}/reports/revenuePerMile?driver=${_driver}&from=${from}&to=${to}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export async function GetNumberOfMiles(driver?: string, dateRange?: any) {
  try {
    const from = dateRange?.from ? dateRange.from : null;
    const to = dateRange?.to ? dateRange.to : null;
    const _driver = (driver != null && driver?.length > 0) ? driver : null;

    const response = await fetch(`${api}/reports/numberOfMiles?driver=${_driver}&from=${from}&to=${to}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default GetAllRevenueData;
