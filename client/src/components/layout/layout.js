import Footer from "./foooter";
import Header from "./header";
import React from "react";
import { SearchResultsProvider } from "../context/search";

// creating a layout for our app using header and footer 
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
