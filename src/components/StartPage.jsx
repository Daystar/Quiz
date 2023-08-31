import React, { useState } from "react";

const StartPage = ({ onStart }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onStart function to indicate that the quiz has started
    onStart(email);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="max-w-md p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome to the Quiz!
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">
            Enter your email:
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartPage;
