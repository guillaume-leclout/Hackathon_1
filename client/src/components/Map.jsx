import React from 'react';

const Map = ({ longitude, latitude }) => {
  return (
    <div className="map">
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d83999.06631218531!2d${
          longitude || ''
        }!3d${
          latitude || ''
        }!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%20toilettes%20publiques!5e0!3m2!1sfr!2sfr!4v1683809345061!5m2!1sfr!2sfr`}
        width="360"
        height="220"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
};

export default Map;
