import { DriverDetail } from "../components/Types/types";

const api = import.meta.env.VITE_API_URL;

async function GetAllDrivers() {
    let drivers;
    await fetch(`${api}/driverDetails`, {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        drivers = data;
    })
    .catch((error) => console.log(error));
    return drivers;
}


// export async function CreateNewLoad(load: DriverDetail) {
//     let newLoad;
//     const requestOptions = {
//         method: "POST",
//         headers: { 
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(load)
//     };
//     await fetch(`${api}/loadDetails`, requestOptions)
//         .then(response => response.json())
//         .then(data => newLoad = data);
//     return newLoad;
// }


export default GetAllDrivers;