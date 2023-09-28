import { useState, useEffect, useMemo } from "react";
import { useLocationContext } from "../App";
import axios from "axios";
import {
  WEATHER_API_URL,
  apiKey,
  kelvinToF,
  hpaToinHg,
} from "../utils/constants";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { PiGaugeLight } from "react-icons/pi";

const CurrentWeather = () => {
  const { latitude, longitude } = useLocationContext();
  const [currentWeatherData, setCurrentWeatherData] = useState({});

  /* Memoize URL so doesn't need to be recomputed on re-renders*/

  const currentWeatherUrl = useMemo(() => {
    return `${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .get(currentWeatherUrl)
        .then((res) => {
          const { weather, main, wind } = res.data;

          const temp = kelvinToF(main.temp);
          const condition = weather[0].main;
          const icon = weather[0].icon;
          const windSpeed = (wind.speed * 2.237).toFixed(0);
          const humidity = main.humidity;
          const pressure = hpaToinHg(main.pressure);

          setCurrentWeatherData({
            temp,
            condition,
            icon,
            windSpeed,
            humidity,
            pressure,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [latitude, longitude]);

  const { temp, condition, icon, windSpeed, humidity, pressure } =
    currentWeatherData;

  return (
    <div className="current-weather">
      <div className="left">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={condition}
          className="icon"
        />
        <div className="main">
          <h2 className="temp">{temp}°F</h2>
          <p className="condition">{condition}</p>
        </div>
      </div>
      <div className="right">
        <div className="conditions">
          <p>Wind</p>
          <BsWind />
          <p>{windSpeed} mph</p>
        </div>
        <div className="conditions">
          <p>Humidity</p> <WiHumidity />
          <p>{humidity}%</p>
        </div>
        <div className="conditions">
          <p>Pressure</p> <PiGaugeLight />
          <p>{pressure} inHg</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
