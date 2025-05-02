import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceAvailability = () => {
    const [locationStatus, setLocationStatus] = useState('Fetching location...');
    const allowedCities = ['ahmedabad', 'gandhinagar', 'surat']; // lowercase for comparison
    const [city, setCity] = useState("Gujrat")
    useEffect(() => {
        const fetchLocation = async () => {
          try {
            const res = await axios.get('https://ipapi.co/json/');
            const { city } = res.data;

            setCity(city);
      
            if (allowedCities.includes(city.toLowerCase())) {
              setLocationStatus(`Service available`);
            } else {
              setLocationStatus('Service not provided in this location');
            }
          } catch (error) {
            console.error("Location fetch failed:", error);
            setLocationStatus('Failed to determine location');
          }
        };
      
        fetchLocation();
      }, []);
      

    return (
        <div className='d-flex flex-column'>
            {/* {city}
            <span>{locationStatus}</span> */}
        </div>
    );
};

export default ServiceAvailability;
