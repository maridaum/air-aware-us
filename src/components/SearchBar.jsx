import { useState } from "react";
import { useLocationContext } from "../App";
import axios from "axios";
import { AsyncPaginate } from "react-select-async-paginate";

const SearchBar = () => {
  const [search, setSearch] = useState(null);
  const { updateLocation } = useLocationContext();

  const loadOptions = async (inputValue) => {
    try {
      /* Checks if data is already in local storage to minimize API requests */
      const cachedData = localStorage.getItem(inputValue);
      if (cachedData) {
        const cachedOptions = JSON.parse(cachedData).features.map((city) => {
          return {
            value: `${city.properties.lat} ${city.properties.lon}`,
            label: `${city.properties.city}, ${city.properties.state}`,
          };
        });

        return {
          options: cachedOptions,
        };
      }

      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${inputValue}&lang=en&limit=10&type=postcode&filter=countrycode:us&apiKey=6376908a278745c38d62925232de03de`
      );

      const data = await response.data;

      localStorage.setItem(inputValue, JSON.stringify(data));

      return {
        options: data.features.map((city) => {
          return {
            value: `${city.properties.lat} ${city.properties.lon}`,
            label: `${city.properties.city}, ${city.properties.state}`,
          };
        }),
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    const [newLat, newLon] = searchData.value.split(" ");
    const [newCity] = searchData.label.split(",");
    console.log(newCity);
    updateLocation(newLat, newLon, newCity);
  };

  return (
    <AsyncPaginate
      placeholder="Search By Zipcode"
      debounceTimeout={600}
      value={null}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      isLoading={false}
    />
  );
};

export default SearchBar;
