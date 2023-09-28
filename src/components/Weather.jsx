import { useLocationContext } from "../App";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import CurrentAirQuality from "./CurrentAirQuality";
import { months, daysOfWeek } from "../utils/constants";

const Weather = () => {
  const { city } = useLocationContext();

  const date = new Date();
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];

  return (
    <section className="weather">
      <div className="location-date">
        <h2 className="location">{city}</h2>
        <p className="date">
          {dayOfWeek}, {day} {month} {year}
        </p>
      </div>

      <div className="current">
        <CurrentWeather />
        <CurrentAirQuality />
      </div>

      <WeatherForecast />
    </section>
  );
};

export default Weather;
