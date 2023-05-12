import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import '../pages/dashboard.css'

import './toiletlist.css';

const ToiletList = () => {
  const [toilets, setToilets] = useState([]);
  const [currLocationJs, setCurrLocationJs] = useState({});

  useEffect(() => {
    const getLocationJs = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrLocationJs({ latitude, longitude });
      });
    };

    getLocationJs();
  }, []);

  useEffect(() => {
    const fetchToilets = async () => {
      const url = 'https://public-bathrooms.p.rapidapi.com/location/';
      const params = {
        lat: currLocationJs.latitude,
        lng: currLocationJs.longitude,
        page: '1',
        per_page: '100',
        offset: '0',
        ada: 'false',
        unisex: 'false',
      };
      const headers = {
        'X-RapidAPI-Key': 'dc3ef64017mshecdc84b59ce0cf6p13e9c3jsn494a6d8a7970',
        'X-RapidAPI-Host': 'public-bathrooms.p.rapidapi.com',
      };

      try {
        const response = await axios.get(url, {
          params,
          headers,
        });
        setToilets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (currLocationJs.latitude && currLocationJs.longitude) {
      fetchToilets();
    }
  }, [currLocationJs]);

  return (
    <div className="ToiletList">
      <h2>Public Toilets Around You : </h2>
      <Map {...currLocationJs} />
      <h2>Toilet Partners : </h2>
      {toilets &&
        toilets.map((toilet) => (
          <p key={toilet.id}>
            {toilet.name} {toilet.city} {toilet.street}
          </p>


        ))}

    </div>
  );
};

export default ToiletList;
