import { useState, useEffect, useMemo } from "react";
import { useLocationContext } from "../App";
import axios from "axios";
import { POLLUTION_API_URL, apiKey } from "../utils/constants";

const CurrentAirQuality = () => {
  const { latitude, longitude } = useLocationContext();
  const [currentAQData, setCurrentAQData] = useState({});

  const currentAQUrl = useMemo(() => {
    return `${POLLUTION_API_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude) {
      axios.get(currentAQUrl).then((res) => {
        const { co, nh3, no, no2, o3, pm2_5, pm10, so2 } =
          res.data.list[0].components;
        const { aqi } = res.data.list[0].main;

        let quality =
          aqi === 1
            ? "Good"
            : aqi === 2
            ? "Fair"
            : aqi === 3
            ? "Moderate"
            : aqi === 4
            ? "Poor"
            : aqi === 5
            ? "Very Poor"
            : "";

        setCurrentAQData({
          aqi,
          quality,
          co,
          nh3,
          no,
          no2,
          o3,
          pm2_5,
          pm10,
          so2,
        });
      });
    }
  }, [latitude, longitude]);

  const { aqi, quality, co, no2, o3, pm2_5, pm10, so2 } = currentAQData;

  return (
    <div className="current-air-quality">
      <div className="aqi">
        <h2 className="title">Air Quality</h2>
        <h1 className="aqi-num">{aqi}</h1>
        <h2 className="quality">{quality}</h2>
      </div>
      <div className="pollutants">
        <h3>Pollutants(μg/m3)</h3>
        <div className="top">
          <div className="pollutant">
            <p className="name">CO</p>
            <p className="concentration">{co}</p>
          </div>
          <div className="pollutant">
            <p className="name">NO2</p>
            <p className="concentration">{no2}</p>
          </div>
          <div className="pollutant">
            <p className="name">O3</p>
            <p className="concentration">{o3}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="pollutant">
            <p className="name">SO2</p>
            <p className="concentration">{so2}</p>
          </div>
          <div className="pollutant">
            <p className="name">PM2.5</p>
            <p className="concentration">{pm2_5}</p>
          </div>
          <div className="pollutant">
            <p className="name">PM10</p>
            <p className="concentration">{pm10}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentAirQuality;
