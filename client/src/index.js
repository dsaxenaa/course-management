import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { AuthProvider } from "./components/context/auth.js";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { SearchResultsProvider } from "./components/context/search";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthProvider>  
      <SearchResultsProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            theme="colored"
            autoClose={2000}
          />
          <App />
        </BrowserRouter>
      </SearchResultsProvider>
    </AuthProvider>
  </>
);
