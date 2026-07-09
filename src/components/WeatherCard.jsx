import React, { useState } from "react";
import weatherCodes from "../weatherCode";

const WeatherCard = ({weather,countryCode,locationName}) => {

  const [farenheit, setFarenheit] = useState(false);

  const toFarenheit = (value) => {
    let f_value = (value * (9/5) ) + 32
    return f_value.toFixed(2);
  }


  return (
    <>
      <div className="weather-card">
        <div className="d-flex justify-content-between align-items-flex-start mb-3">
          <div>
            <p className="city-name">
              {locationName} <span className="country-badge ms-1">{countryCode}</span>
            </p>
            <p className="weather-desc">{weatherCodes[weather.current.weather_code].description}</p>
          </div>
          <span style={{ fontSize:"50px" }}>{weatherCodes[weather.current.weather_code].icon}</span>
        </div>

        <div className="d-flex align-items-flex-end mb-3">
          <span className="temperature">
            {farenheit == true && toFarenheit(weather.current.temperature_2m)}
            {farenheit == false && weather.current.temperature_2m}
          </span>
          <span className="temp-unit ms-1">
            {farenheit == true && "F"}
            {farenheit == false && weather.current_units.temperature_2m}
          </span>
        </div>

        <div className="tabs">
          <button className={farenheit === false ? "tab-btn active": "tab-btn"} onClick={() => {setFarenheit(false)}}>°C</button>
          <button className={farenheit === true ? "tab-btn active": "tab-btn"} onClick={() => {setFarenheit(true)}}>°F</button>
        </div>

        <div className="divider"></div>

        <div className="row g-3">
          <div className="col-4">
            <div className="stat-card">
              <div className="stat-icon">💧</div>
              <div className="stat-label">Humidity</div>
              <div className="stat-value">{weather.current.relative_humidity_2m}{weather.current_units.relative_humidity_2m}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="stat-card">
              <div className="stat-icon">💨</div>
              <div className="stat-label">Wind</div>
              <div className="stat-value">{weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="stat-card">
              <div className="stat-icon">👁️</div>
              <div className="stat-label">Feels like</div>
              <div className="stat-value">
                {farenheit == true && toFarenheit(weather.current.apparent_temperature)+"F"}
                {farenheit == false && weather.current.apparent_temperature+weather.current_units.apparent_temperature}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
