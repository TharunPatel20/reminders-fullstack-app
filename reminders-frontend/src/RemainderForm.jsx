import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function RemainderForm({ setRemaind }) {
  const [postData, setPostData] = useState(null);

  const initialValues = {
    text: "",
    remindOn: "",
    remindMe: false
  };

  const validationSchema = Yup.object({
    text: Yup.string().required("Reminder text is required"),
    remindOn: Yup.date().required("Remind on date is required"),
    remindMe: Yup.boolean(),
  });

  useEffect(() => {

    const username = localStorage.getItem("username");
    if (postData) {
      axios
        .post("http://localhost:9000/api/reminders", postData, {
          headers: {
            username: username,
          },
        })
        .then((response) => {
          console.log("Submitted:", response.data);
          setRemaind(false);
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => setPostData(null));
    }
  }, [postData, setRemaind]);

  return (
    <div className="mb-6 max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        Add a New Reminder
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          setPostData(values);
          resetForm();
        }}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="text" className="block text-gray-700 font-medium">
                Reminder Text
              </label>
              <Field
                type="text"
                name="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="text"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="remindOn" className="block text-gray-700 font-medium">
                Remind On
              </label>
              <Field
                type="date"
                name="remindOn"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="remindOn"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex items-center">
              <Field
                type="checkbox"
                name="remindMe"
                className="mr-2 w-4 h-4 text-blue-600"
              />
              <label htmlFor="remindMe" className="text-gray-700 font-medium">
                Remind Me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Reminder
            </button>
          </Form>
        )}
      </Formik>

      <button
        onClick={() => setRemaind(false)}
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mt-4"
      >
        Cancel
      </button>
    </div>
  );
}
