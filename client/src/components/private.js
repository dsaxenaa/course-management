import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import { Spinner } from "./spinner";
import axios from "axios";
import { useAuth } from "./context/auth";

const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    // ensuring auth is defined and contains a token before making the axios request
    if (auth && auth.token) {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:8000/api/v1",
        headers: {
          Authorization: `Bearer ${auth.token}`, //setting up the token in the header
          "Content-Type": "application/json",
        },
      });

      const authCheck = async () => {
        try {
          const res = await axiosInstance.get(`/users/user-auth`); // calling the authentication api
          if (res.data && res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        } catch (error) {
          setOk(false);
        }
      };

      authCheck();
    } else {
      //  auth or token is not available so can't access the homepage
      setOk(false);
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />; // can access the outlet only if the status is true
};

export default Private;
