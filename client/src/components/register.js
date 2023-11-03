import React, { useState } from "react";

import Layout from "./layout/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const naviagte = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/users/register",  // calling the register api
        formData
      );
      toast.success("Registration successful!");
      console.log(data);
      naviagte("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("User is already registered.");
        }
        if (error.response.status === 500) {
          toast.error("Something went wrong or validation error!");
        }
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-500/20 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 rounded border"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 rounded border"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 rounded border"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Registration;
