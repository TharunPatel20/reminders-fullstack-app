import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Remainder({ data, refresh }) {
  const [updateId, setUpdateId] = useState(null);
  const [removeId, setRemoveId] = useState(null);

  useEffect(() => {
    if (removeId !== null) {
      axios
        .delete(`http://localhost:9000/api/reminders/${removeId}`)
        .then((response) => {
          console.log("Deleted:", response);
          refresh?.(); // optional refresh function to re-fetch data
        })
        .catch((error) => console.error("Delete Error:", error))
        .finally(() => setRemoveId(null));
    }
  }, [removeId]);

  useEffect(() => {
    if (updateId !== null) {
      axios
        .put(`http://localhost:9000/api/reminders/${updateId}`, { status: "COMPLETE" }) // example
        .then((response) => {
          console.log("Updated:", response);
          refresh?.();
        })
        .catch((error) => console.error("Update Error:", error))
        .finally(() => setUpdateId(null));
    }
  }, [updateId]);

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((reminder) => (
          <div
            key={reminder.id}
            className={`p-4 border rounded-md shadow-sm ${
              reminder.status === "PENDING"
                ? "bg-yellow-100 border-yellow-300"
                : "bg-green-100 border-green-300"
            }`}
          >
            <div className="grid grid-cols-6 gap-5 items-center">
              <p className="col-span-5 text-lg text-blue-600">
                {reminder.text}
              </p>
              <div className="col-span-1 flex justify-end space-x-2">
                {reminder.status === "PENDING" && (
                  <button
                    onClick={() => setUpdateId(reminder.id)}
                    className="hover:bg-green-200 p-1 rounded"
                  >
                    ✔️
                  </button>
                )}
                <button
                  onClick={() => setRemoveId(reminder.id)}
                  className="hover:bg-red-200 p-1 rounded"
                >
                  ❌
                </button>
              </div>
            </div>

            <p className="text-gray-700 mt-2">
              <strong>Remind On:</strong> {reminder.remindOn}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full">No reminders found</p>
      )}
    </div>
  );
}
