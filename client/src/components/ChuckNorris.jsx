import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChuckNorris = () => {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random');
        setJoke(response.data.value);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJoke();
    const interval = setInterval(fetchJoke, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="chuck-norris-banner scrolling-text">

      <span>{joke}</span>
    </div>
  );
};



export default ChuckNorris;
