import React, { useEffect } from "react";

const SearchCard = ({ setCountry, search, suggestion }) => {
  
  useEffect(() => {
    if(suggestion != null && suggestion.data.hasOwnProperty("results")){
      console.log("valid");
    }
  }, [suggestion]);
  return (
    <>
      <div className={"search-card"}>
        <div className={"input-group"}>
          <input
            type="text"
            className={"form-control search-input"}
            placeholder="Enter city name e.g. Dhaka..."
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <button
            className={"btn btn-primary search-btn"}
            onClick={() => {
              search();
            }}
          >
            Search
          </button>
        </div>
        <div
          className={"mt-2"}
          style={{ fontSize: "0.8rem", color: "#dc3545", display: "none" }}
        >
          Please enter a city name.
        </div>
        <ul
          className="suggestions-list"
          id="suggestionsList"
          style={{ display: "block" }}
        >
          {suggestion != null &&
            suggestion.data.results.map((suggestion,index) => {
              return (
                <li className="suggestion-item" key={index}>
                  <span className="suggestion-city">{suggestion.name}</span>
                  <span className="suggestion-country">
                    {suggestion.admin2}, {suggestion.country}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default SearchCard;
