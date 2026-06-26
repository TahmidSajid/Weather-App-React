import React from "react";

const LoadingCard = ({country}) => {
  return (
    <>
      <div className="loading-card">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="loading-text">
          Fetching weather for <strong>{country}</strong>...
        </p>
      </div>
    </>
  );
};

export default LoadingCard;
