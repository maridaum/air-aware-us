const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const GEO_API_URL = "http://api.openweathermap.org/geo/1.0/reverse";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const POLLUTION_API_URL =
  "http://api.openweathermap.org/data/2.5/air_pollution";

const WEATHER_FORECAST_API_URL =
  "http://api.openweathermap.org/data/2.5/forecast";

const POLLUTION_FORECAST_API_URL =
  "http://api.openweathermap.org/data/2.5/air_pollution/forecast";

const apiKey = import.meta.env.VITE_API_KEY;

const kelvinToF = (temp) => ((temp - 273.15) * (9 / 5) + 32).toFixed(1);

const hpaToinHg = (hpa) => {
  return (hpa * 0.02953).toFixed(2)
}

export {
  months,
  daysOfWeek,
  GEO_API_URL,
  WEATHER_API_URL,
  POLLUTION_API_URL,
  WEATHER_FORECAST_API_URL,
  POLLUTION_FORECAST_API_URL,
  apiKey,
  kelvinToF,
  hpaToinHg
};
