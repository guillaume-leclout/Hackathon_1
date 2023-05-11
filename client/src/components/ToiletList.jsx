import { useState, useEffect } from 'react';
import axios from 'axios';
import './ToiletList.css';

const ToiletList = () => {
  const [toilets, setToilets] = useState([]);

  useEffect(() => {
    const fetchToilets = async () => {
        const url = 'https://public-bathrooms.p.rapidapi.com/location/';
        const params = {
            lat: '48.866667',
            lng: ' 2.333333',
            page: '1',
            per_page: '100',
            offset: '0',
            ada: 'false',
            unisex: 'false'
          }
          const headers = {
            'X-RapidAPI-Key': 'd9f26b51c3mshe9d39ff134ec03ap10558fjsncf782f74f152',
            'X-RapidAPI-Host': 'public-bathrooms.p.rapidapi.com'
          }

      try {
        const response = await axios.get(url, {
            params,
            headers
        });
        setToilets(response.data);
      } catch (error) {
        console.error(error);
      }
    };
   
    fetchToilets();
  }, []);

  return (
    <div className="ToiletList">
      {toilets &&
        toilets.map((toilet) => (
          <p key={toilet.id}>{toilet.name} {toilet.city} {toilet.street}</p>
        ))}
    </div>
  );
};

export default ToiletList;
