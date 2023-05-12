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
    <div className='jesaispas'>
    <div className="chuck-norris-banner scrolling-text">

    <h4>Here's a shit joke !! </h4>
      <span>{joke}</span>
    </div>
    </div>
  );
};



export default ChuckNorris;
