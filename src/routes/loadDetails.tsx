async function GetAllLoads() {
    let loads;
    await fetch('http://localhost:3000/loadDetails', {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        loads = data;
    })
    .catch((error) => console.log(error));
    return loads;
}

export default GetAllLoads;
