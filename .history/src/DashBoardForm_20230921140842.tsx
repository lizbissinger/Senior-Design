import React,{useState} from "react";
import LoadModel from "./LoadModel";

function DashBoardForm() {

    const [loadNo, setLoadNo] = useState("");
    const [startLocation, setstartLocation] = useState("");
    const [endLocation, setendLocation] = useState("");
    const [date, setDate] = useState("");
    const [cost , setCost] = useState("");

    const [loads,setLoads]=useState<LoadModel[]>([]); //loads is an array of LoadModel

    const [isFormVisible, setIsFormVisible] = useState(false);

    //handling the form
    const handleSubmit =(e: React.FormEvent) =>{
        e.preventDefault();
        const newLoad= new LoadModel(loadNo,startLocation,endLocation,date,cost);
        setLoads([...loads,newLoad]);

        //reset the form
        setLoadNo("");
        setstartLocation("");
        setendLocation("");
        setDate("");
        setCost("");
        setIsFormVisible(false);
    };

    return(
        <div >
         <button onClick={() => setIsFormVisible(true)}>Open Form</button>
         {isFormVisible && (
             <form onSubmit={handleSubmit}>
                <label>
                    Load No:
                    <input
                        type="text"
                        value={loadNo}
                        onChange={(e) => setLoadNo(e.target.value)}
                        />
                        </label>
                        <label>
                            Starting:
                            <input 
                            type="text"
                            value={startLocation}
                            onChange={(e) => setstartLocation(e.target.value)}
                            />
                        </label>
                        <label>
                            Destination:
                            <input
                            type="text"
                            value={endLocation}
                            onChange={(e) => setendLocation(e.target.value)}
                            />
                        </label>
                        <label>
                            Date:
                            <input
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            />
                        </label>
                        <label>
                            Cost:
                            <input
                            type="text"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            /> 
                        </label>
                        <button type="submit" value="Submit">  Submit </button> 
                        </form>


                        )}  
                    <table>
        <thead>
          <tr>
            <th>Load No</th>
            <th>Starting</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {loads.map((load, index) => (
            <tr key={index}>
              <td>{load.loadNo}</td>
              <td>{load.starting}</td>
              <td>{load.destination}</td>
              <td>{load.date}</td>
              <td>{load.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div> );
        } 

export default DashBoardForm;