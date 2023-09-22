import React,{useState} from "react";

function DashBoardForm() {

    const [loadNo, setLoadNo] = useState("");
    const [startLocation, setstartLocation] = useState("");
    const [endLocation, setendLocation] = useState("");
    const [date, setDate] = useState("");
    const [cost , setCost] = useState("");


    const [isFormVisible, setIsFormVisible] = useState(false);

    //handling the form
    const handleSubmit =(e: React.FormEvent) =>{
        e.preventDefault();
        console.log(loadNo, startLocation, endLocation, date, cost);
    };

    return(
        <div>
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
        </div> );
        } 

export default DashBoardForm;