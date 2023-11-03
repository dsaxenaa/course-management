import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Spinner = ({path=""}) => {
    // using this spinner to get back to the login page if someone tries to access homepage without authentocation. Spinner moves for 3 seconds.
    const [count,setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount(prev=>--prev);
        },1000);
        count ===0 && navigate(`/${path}`,{
            state:location.pathname,
        })
        return()=> clearInterval(interval)
        
    },[count,navigate,location,path])

  return (
    <div>
      <div className="d-flex  flex-column justify-content-center align-items-center text-center" style={{height:"100vh"}}>
        <h1 className="text-center">Redirecting you in {count} seconds.</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};
