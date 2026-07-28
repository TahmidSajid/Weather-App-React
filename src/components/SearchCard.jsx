import React, { useEffect, useState } from "react";

const SearchCard = ({ setCountry, search, suggestion, setLocationName, setContryCode, getWeather, setWeather, setLoading}) => {
  
  const [viewSuggestion, setViewSuggestion] = useState(false);

  const getSuggestionWeather = async (latitude,longitude,timezone,name,country_code) => {

    setLoading(true);
    setWeather(null);
    setViewSuggestion(false);

    let weather = await getWeather(latitude, longitude, timezone);
    setWeather(weather);
    setLocationName(name);
    setContryCode(country_code);

    setLoading(false);
  }

  useEffect(() => {
    if(suggestion != null){
      setViewSuggestion(true);
    }
    else{
      setViewSuggestion(false);
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
              if (e.target.value < 3) {
                setViewSuggestion(false);
              }
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
          {viewSuggestion == true && suggestion.data.hasOwnProperty("results") &&
            suggestion.data.results.map((suggestion,index) => {
              return (
                <li className="suggestion-item" key={index} onClick={()=>{getSuggestionWeather(suggestion.latitude, suggestion.longitude, suggestion.timezone, suggestion.name, suggestion.country_code)}}>
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
