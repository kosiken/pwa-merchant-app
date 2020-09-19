import { useState, useEffect } from 'react';

const useLocations = (value) => {
  const [locations, setLocations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (value) {
      setIsSearching(true);
      try {
        if (!window.FiveService) {
          setIsSearching(false);
          setHasError(true);
          return;
        }
        setHasError(false);
        window.FiveService.getPlacePredictions(
          { input: value, bounds: window.FiveBounds },
          (predictions, status) => {
            console.log(predictions);
            console.log(status);
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              if (predictions instanceof Array) setLocations(predictions);
            }
            setIsSearching(false);
          }
        );
      } catch (err) {
        console.log(err);setHasError(true);
      }
    }
  }, [value]);

  return { locations, isSearching, hasError };
};
export default useLocations;
