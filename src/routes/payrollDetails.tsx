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

export async function CreateNewPayroll(payroll: PayrollDetail): Promise<PayrollDetail | undefined> {
  console.log("Createing new payroll");
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payroll),
    };

    const response = await fetch(`${api}/Payroll`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to create a new Payroll: ${response.statusText}`);
    }

    const newPayroll: PayrollDetail = await response.json();
    return newPayroll;
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
      throw new Error(`Failed to delete the Payroll: ${response.statusText}`);
    }

    const deletedPayroll: PayrollDetail = await response.json();
    return deletedPayroll;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}



export default GetAllPayroll;
