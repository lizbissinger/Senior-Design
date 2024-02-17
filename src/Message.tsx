import { useState, useEffect } from "react";

function GetAPI() {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/api", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h2>Message from API:</h2>
      {<p>{message}</p>}
    </div>
  );
}
export default GetAPI;
