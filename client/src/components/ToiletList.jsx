
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ToiletList.css';

const ToiletList = () => {
  const [toilets, setToilets] = useState([]);
  const [currLocationJs, setCurrLocationJs] = useState({});
  const iframeRef = useRef(null);

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
        'X-RapidAPI-Key': 'd9f26b51c3mshe9d39ff134ec03ap10558fjsncf782f74f152',
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

  useEffect(() => {
    const handleMapDrag = () => {
      const map = iframeRef.current.contentWindow;
      map.addEventListener('dragend', () => {
        const newLatitude = map.lat;
        const newLongitude = map.lng;
        setCurrLocationJs({ latitude: newLatitude, longitude: newLongitude });
      });
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleMapDrag);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleMapDrag);
      }
    };
  }, []);
  return (
    <div className="ToiletList">
        <iframe src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d83999.06631218531!2d${currLocationJs.longitude || ""}!3d${currLocationJs.latitude || ""}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%20toilettes%20publiques!5e0!3m2!1sfr!2sfr!4v1683809345061!5m2!1sfr!2sfr`} width="800" height="600" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      {toilets &&
        toilets.map((toilet) => (
          <p key={toilet.id}>{toilet.name} {toilet.city} {toilet.street}</p>
        ))}
    </div>
  );




export default ToiletList;
