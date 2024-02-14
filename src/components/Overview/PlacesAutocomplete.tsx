import React, { useEffect, useRef } from 'react';
import TextInput  from "@tremor/react";

interface PlacesAutocompleteProps {
  onPlaceSelected: (lat: number, lng: number) => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ onPlaceSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCGylTS64QlW8c1eGxcBtDbcgsa8roUPuM&libraries=places`;
      script.async = true;
      script.onload = initializeAutocomplete;
      document.body.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  const initializeAutocomplete = () => {
    if (inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        onPlaceSelected(lat, lng);
      });
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search"
      className="form-control"
    />
  );
};

export default PlacesAutocomplete;
