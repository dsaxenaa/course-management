import React, { useState } from "react";

import Layout from "./layout/layout.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./context/auth.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const naviagte = useNavigate();
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
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
        "http://localhost:8000/api/v1/users/login",  //calling the login api and sending the details to login
        formData
      );
      console.log(data);
      naviagte("/home/courses");
      setAuth({             //setting the user context using setAuth
        ...auth,
        user: data.user,
        token: data.token,
      });
      localStorage.setItem("auth", JSON.stringify(data));    // setting the local storage 
      toast.success("Login successful!");
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message == "Wrong Password!") {
        toast.error("Wrong Password!");
      }
      if (error.response.data.message == "User does not exist!") {
        toast.error("User does not exist!");
      } else {
        toast.error("Validation error or missing field!");
      }
    }
  };
  return (
    <Layout>
      <div className="min-h-screen bg-gray-500/20 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
