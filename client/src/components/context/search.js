import React, { createContext, useContext, useState } from "react";

// creating the context for the search bar 
const SearchResultsContext = createContext();

export const useSearchResults = () => {
  return useContext(SearchResultsContext);
};

export const SearchResultsProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
};
