import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required");
    } else {
      console.log("Username:", username);
      console.log("Password:", password);
      setError("");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 px-8">
        <h1 className="text-2xl">My App</h1>
      </header>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
