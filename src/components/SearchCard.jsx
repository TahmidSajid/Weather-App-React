import React from "react";

const SearchCard = ({setCountry, search}) => {

  return (
    <>
      <div className={"search-card"}>
        <div className={"input-group"}>
          <input
            type="text"
            className={"form-control search-input"}
            placeholder="Enter city name e.g. Dhaka..."
            onChange={(e)=>{setCountry(e.target.value)}}
            
          />
          <button className={"btn btn-primary search-btn"} onClick={()=>{search()}}>Search</button>
        </div>
        <div className={"mt-2"} style={{ fontSize:'0.8rem',color:"#dc3545",display:"none" }}>
          Please enter a city name.
        </div>
      </div>
    </>
  );
};

export default SearchCard;
