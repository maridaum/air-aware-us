import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { Weather, Header, Footer, Loading, Error } from "./components";
import { GEO_API_URL, apiKey } from "./utils/constants";

export const LocationContext = createContext();

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const updateLocation = (newLat, newLon, newCity) => {
    setLatitude(newLat);
    setLongitude(newLon);
    setCity(newCity);
    setIsError(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          axios
            .get(
              `${GEO_API_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            )
            .then((res) => {
              const { name } = res.data[0];
              setCity(name);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setIsError(true);
              setIsLoading(false);
            });
        },
        (err) => {
          console.log(err);
          setIsError(true);
          setIsLoading(false);
        }
      );
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{ latitude, longitude, city, updateLocation }}
    >
      <div className="app">
        <Header />
        {isLoading ? <Loading /> : isError ? <Error /> : <Weather />}
        <Footer />
      </div>
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => useContext(LocationContext);

export default App;
