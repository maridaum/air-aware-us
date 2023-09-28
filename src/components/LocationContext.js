import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const setLocation = (lat, lon) => {
        setLatitude(lat);
        setLongitude(lon);
    };

    return (
        <LocationContext.Provider value={{ latitude, longitude, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    return useContext(LocationContext);
};
