import { PayrollDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

export async function GetAllPayroll(): Promise<PayrollDetail[] | undefined> {
  try {
    const response = await fetch(`${api}/Payroll`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Payroll: ${response.statusText}`);
      
    }

    const data: PayrollDetail[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function CreateNewPayroll(repair: PayrollDetail): Promise<PayrollDetail | undefined> {
  console.log("Createing new payroll");
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(repair),
    };

    const response = await fetch(`${api}/Payroll`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to create a new repair: ${response.statusText}`);
    }

    const newRepair: PayrollDetail = await response.json();
    return newRepair;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function UpdatePayroll(payroll: PayrollDetail): Promise<PayrollDetail | undefined> {
  try {
    const requestOptions = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payroll),
    };

    const response = await fetch(`${api}/Payroll/${payroll._id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to update the payroll: ${response.statusText}`);
    }

    const updatedPayroll: PayrollDetail = await response.json();
    return updatedPayroll;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function DeletePayroll(id: string): Promise<PayrollDetail | undefined> {
  try {
    const response = await fetch(`${api}/PayrollDetails/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete the repair: ${response.statusText}`);
    }

    const deletedRepair: PayrollDetail = await response.json();
    return deletedRepair;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}



export default GetAllPayroll;
