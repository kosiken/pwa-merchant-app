export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const PAYSTACK_KEY = 'pk_live_ee53a8e6d8d37419efe4d88eeb186a99b12ef137';

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
export function getDistance(location1, location2) {
  let { latitude: lat1, longitude: lon1 } = location1;
  let { latitude: lat2, longitude: lon2 } = location2;

  const o1 = (lat1 * Math.PI) / 180,
    o2 = (lat2 * Math.PI) / 180,
    D = ((lon2 - lon1) * Math.PI) / 180,
    R = 6371e3;
  const d =
    Math.acos(
      Math.sin(o1) * Math.sin(o2) + Math.cos(o1) * Math.cos(o2) * Math.cos(D)
    ) * R;
  return Math.abs(Math.round(d / 1000));
}

export function getFee(distance) {
  return distance > 8 ? false : distance > 4 ? 1000 : 500;
}
