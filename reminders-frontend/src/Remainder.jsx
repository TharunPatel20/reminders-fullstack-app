import React from "react";

export default function Remainder({ data }) {
  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((reminder, index) => (
          <div
            key={index}
            className={`p-4 border rounded-md shadow-sm ${
              reminder.status === "PENDING"
                ? "bg-yellow-100 border-yellow-300"
                : "bg-green-100 border-green-300"
            }`}
          >
            <p className="text-lg font-semibold text-blue-600">{reminder.text}</p>
            <p className="text-gray-700">
              <strong>Remind On:</strong> {reminder.remindOn}
            </p>
            <p className="text-gray-700">
              <strong>Remind Me:</strong> {reminder.remindMe ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500 mt-2 italic">
              Status: {reminder.status}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full">No reminders found</p>
      )}
    </div>
  );
}
