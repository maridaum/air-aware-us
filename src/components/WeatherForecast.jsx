import { useState, useEffect, useMemo } from "react";
import { useLocationContext } from "../App";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import {
  WEATHER_FORECAST_API_URL,
  apiKey,
  daysOfWeek,
} from "../utils/constants";
import { kelvinToF, hpaToinHg } from "../utils/functions";

const WeatherForecast = () => {
  const { latitude, longitude } = useLocationContext();
  const [forecastData, setForecastData] = useState([]);

  const weatherForecastUrl = useMemo(() => {
    return `${WEATHER_FORECAST_API_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  }, [latitude, longitude]);

  const everyThirdIndex = (arr) => {
    return arr.filter((_, index) => {
      return (index + 1) % 3 === 0;
    });
  };

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .get(weatherForecastUrl)
        .then((res) => setForecastData(res.data.list));
    }
  }, [latitude, longitude]);

  return (
    <div className="weather-forecast">
      {forecastData.map((data, index) => {
        const { dt, main, weather } = data;
        const date = new Date(dt * 1000);
        const day = daysOfWeek[date.getDay()];
        let hours = date.getHours();
        const temp = kelvinToF(main.temp);

        return (
          <WeatherCard
            day={day}
            time={hours}
            icon={weather[0].icon}
            condition={weather[0].main}
            temp={temp}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default WeatherForecast;
