import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useAuth } from "../context/auth";
import { useSearchResults } from "../context/search";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const { setSearchResults } = useSearchResults();
  const naviagte = useNavigate();

  const [search,setSearch] = useState("")

  const handleClick =async()=>{
    const keyword = search
    const {data} = await axios.post(`http://localhost:8000/api/v1/courses/search`,{keyword})   //api to search courses based upon the keyword coming from search bar
    console.log(data)
    setSearchResults(data)
  }
  
  useEffect(()=>{
    handleClick();
  },[search])   // using this useeffect function whenever the search variable changes to call the search api


  return (
    <div>
      <header className="bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-800 py-4">
        <nav className="container mx-auto flex justify-between items-center">
          {auth.user ? (
            <Link
              to="/home/courses"
              className="text-white text-2xl font-semibold"
            >
              My Courses App
            </Link>
          ) : (
            <Link to="/" className="text-white text-2xl font-semibold">
              My Courses App
            </Link>
          )}
          <form className="d-flex">
            <input
              className="form-control w-[25rem] mr-[1rem]"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            {/* <button type="button" className="btn btn-outline-success" onClick={handleClick}>
              Search
            </button> */}
          </form>

          <ul className="flex space-x-4">
            {auth.user ? (
              <React.Fragment>
                <li>
                  <Link to="/home/dashboard" className="text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setAuth({ ...auth, user: null, token: "" });
                      localStorage.removeItem("auth");
                      naviagte("/");
                    }}
                    className="text-white cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <Link to="/" className="text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-white">
                    Register
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
