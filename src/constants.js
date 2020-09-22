export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_KEY; 
console.log(process.env)
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
    text: `Add a card which we would use to fund your wallet`,
  },
  {
    title: `All done`,
    text: 'Welcome aboard to 500dash',
  },
];
