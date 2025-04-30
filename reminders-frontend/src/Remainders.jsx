import axios from "axios";
import { useEffect, useState } from "react";
import RemainderForm from "./RemainderForm";
import Remainder from "./Remainder";

export default function Remainders() {
  const [data, setData] = useState([]); //get response
  const [load, setLoad] = useState(false);
  const [remaind, setRemaind] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/reminders/u?userName=Tharun")
      .then((response) => {
        console.log(response);
        setData(response.data.payload || response.data);
      })
      .catch((error) => console.error("Error:", error));
    return setLoad(false);
  }, [load]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Reminders
      </h1>
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-md">
        {remaind  ? (
          <RemainderForm setRemaind={setRemaind}/>
        ) : (
          <button 
          className="w-full bg-blue-600 text-white p-2 rounded-md mt-4 hover:bg-blue-700"
          onClick={() => setRemaind(!remaind)}>
            Add Remainder</button>
        )}
        <div>
          <button 
          className="w-full bg-blue-600 text-white p-2 rounded-md mt-4 hover:bg-blue-700"
          onClick={() => setLoad(!load)}>load my remainds</button>
        </div>
        <Remainder data={data} />
      </div>
    </div>
  );
}
