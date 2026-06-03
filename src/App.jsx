import { useState } from "react";
import "./App.css";
import SearchCard from "./components/SearchCard";
import api from "./api/axios";

function App() {

  const [country, setCountry] = useState(null);

  const search = async () =>{
    const location = await api.get(`https://geocoding-api.open-meteo.com/v1/search?name=${country}&count=1&language=en&format=json`);
    let latitude = location.data.results[0].latitude;
    let longitude = location.data.results[0].longitude;
    let timezone = location.data.results[0].timezone;
    console.log(location);
    const weather = await api.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=${['temperature_2m','relative_humidity_2m','wind_speed_10m','weather_code','apparent_temperature']}&timezone=${timezone}`);
    console.log(weather);
  }

  return (
    <>
      <div className={"weather-wrapper"}>
        <h1 className={"app-title"}>Weather App</h1>
        <p className={"app-subtitle"}>Search any city to get current conditions</p>
        <SearchCard setCountry={setCountry} search={search}/>
      </div>
    </>
  );
}

export default App;
