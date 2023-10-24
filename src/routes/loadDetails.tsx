import { useState, useEffect } from "react";

function GetAllLoads() {
    const [loads, setLoads] = useState(null);
    useEffect(() => {
      fetch('http://localhost:3000/loadDetails', {
        method: "GET"
      })
        .then((response) => response.json())
        .then((data) => {
          setLoads(data.message);
        })
        .catch((error) => console.log(error));
    }, []);
    return loads;
  }

export default GetAllLoads;
