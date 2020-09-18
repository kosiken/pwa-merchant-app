export const GOOGLE_MAPS_API_KEY = 'AIzaSyCDRINRTtuQGCi8P7V8lYPcJkuYW5HIKJA';
export const PAYSTACK_KEY = 'pk_test_8375cb0559631010056db94e05b725e445435002';

export function getDetails(id) {
  return new Promise((res, rej) => {
    window.FivePlacesService.getDetails(
      {
        placeId: id,
        fields: ['name', 'formatted_address', 'geometry', 'plus_code', 'url'],
      },
      (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log(result);
          res({
            latitude: result.geometry.location.lat(),
            longitude: result.geometry.location.lng(),
            full_address: `${result.name} ${result.formatted_address}`,
            plus_code: result.plus_code && result.plus_code.compound_code,
            google_map_link: result.url,
          });
        } else rej(status);
      }
    );
  });
}
export const HelpInfo = {
  recepient: `This information helps us know where to 
deliver your products`,
};
/* api
      .editModel(
       {
          ...s,

          food_items: foods,
          model: 'Meal'
        },
        token
      )
      .then((result) => {
        setLoading(false);
        handleOpen('Meal Created');
      })
      .catch((err) => {
        setLoading(false);
        handleOpen(err.data.error);
      });
      
              let request = {
          query: value,
          fields: ['name', 'formatted_address', 'geometry', 'plus_code', 'url'],
          region: '.ng',
          locationBias: {
            radius: 100,
            center: { lat: 6.465422, lng: 3.406448 },
          },
        };

        window.FiveService.textSearch(request, function (results, status) {
          if (status === 'ZERO_RESULTS') setLocations([]);
          if (status === 'OK') {
            if (results instanceof Array)
              setLocations(
                results.map((result) => {
                  return {
                    latitude: result.geometry.location.lat(),
                    longitude: result.geometry.location.lng(),
                    full_address: `${result.name} ${result.formatted_address}`,
                    plus_code:
                      result.plus_code && result.plus_code.compound_code,
                    google_map_link: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${result.place_id}`,
                  };
                })
              );
          } });
          
          "ChIJXT95K8yeOxARkIUeL8MSxu0"

  */
