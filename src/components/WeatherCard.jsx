import React from "react";
import weatherCodes from "../weatherCode";

const WeatherCard = ({weather,countryCode,locationName}) => {
    console.log(weather);
    console.log(weatherCodes[weather.current.weather_code].description)
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
          <img
            className="weather-icon"
            src="https://openweathermap.org/img/wn/04d@2x.png"
            alt="weather icon"
          />
        </div>

        <div className="d-flex align-items-flex-end mb-3">
          <span className="temperature">{weather.current.temperature_2m}</span>
          <span className="temp-unit ms-1">{weather.current_units.temperature_2m}</span>
        </div>

        <div className="tabs">
          <button className="tab-btn active">°C</button>
          <button className="tab-btn">°F</button>
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
              <div className="stat-value">{weather.current.apparent_temperature}{weather.current_units.apparent_temperature}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
