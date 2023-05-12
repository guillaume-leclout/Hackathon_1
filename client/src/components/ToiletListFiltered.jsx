import React, { useState, useEffect } from 'react';
import './toiletlistfiltered.css';
import axios from 'axios';
import '../pages/dashboard.css'

import {countryCodes} from './db'

const ToiletListFiltered = () => {
  const [toiletListFiltered, setToiletListFiltered] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const fetchFilteredToilets = async () => {
      const url = 'https://public-bathrooms.p.rapidapi.com/all';
      const params = {
        page: '1',
        per_page: '100',
        offset: '0',
        ada: 'false',
        unisex: 'false',
      };

      const headers = {
        'X-RapidAPI-Key': 'd9f26b51c3mshe9d39ff134ec03ap10558fjsncf782f74f152',
        'X-RapidAPI-Host': 'public-bathrooms.p.rapidapi.com',
      };

      try {
        const response = await axios.get(url, {
          params,
          headers,
        });
        setToiletListFiltered(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredToilets();
  }, []);

  const handleCountryFilter = (country) => {
    setSelectedCountry(country);
  };



  const uniqueCountries = Array.from(
    new Set(toiletListFiltered.map((toilet) => toilet.country))
  );

  const filteredToiletList = selectedCountry
    ? toiletListFiltered.filter(
        (toilet) => toilet.country === selectedCountry
      )
    : toiletListFiltered;

  return (
    <div className='filteredList'>
      {uniqueCountries.map((country) => (
        <button
          key={country}
          onClick={() => handleCountryFilter(country)}
          disabled={selectedCountry === country}
        >
          {countryCodes[country]} 
        </button>
      ))}
      {selectedCountry && (
        <h2>Filtered Toilet List for {countryCodes[selectedCountry]}:</h2> 
      )}
      {filteredToiletList.map((toilet) => (
        <p key={toilet.id}>{toilet.name} {toilet.city}</p>
      ))}
    </div>
  );
};

export default ToiletListFiltered;
