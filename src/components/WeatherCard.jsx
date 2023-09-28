const WeatherCard = ({ day, time, icon, condition, temp }) => {
  return (
    <div className="weather-card">
      <h4>{day}</h4>
      <p>{time}:00</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={condition}
      />
      <p>{`${temp}°F`}</p>
      <p>{condition}</p>
    </div>
  );
};

export default WeatherCard;
