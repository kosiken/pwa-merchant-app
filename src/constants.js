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
  Customer: `This information helps us know where to 
deliver your products`,
  Location: `Address where to pick up deliveries`,
};

export const OnboardingSteps = [
  {
    title: 'Welcome',
    text: `Now you've signed up there are a few
    things we want you to do`,
  },
  {
    title: 'Add a Customer',
    text: `Saved Customers are customers who you often make deliveries to. 
    You can save them to quickly select them when you want to make a delivery`,
  },

  {
    title: 'Add Payment Method',
    text: `Add a card which we would use in billing all deliveries you make using 500dash`,
  },
  {
    title: `All done`,
    text: 'Welcome aboard to 500dash',
  },
];
