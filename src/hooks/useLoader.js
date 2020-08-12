import { useEffect, useState } from 'react';
import Placeload from 'placeload.js';
const useLoader = () => {
  let Loader = Placeload.$('.user-placeload')
    .config({ speed: '2s' })
    .line((element) => element.width(300).height(200))
    .config({ spaceBetween: '30px' })
    .line((element) => element.width(400).height(20))
    .config({ spaceBetween: '30px' })
    .line((element) => element.width(400).height(20))
    .config({ spaceBetween: '30px' })
    .line((element) => element.width(250).height(20));

  const [mLoader] = useState(Loader);
  useEffect(() => {
    mLoader.fold(
      (err) => console.log('error: ', err),
      (allElements) => console.log('allElements: ', allElements)
    );
    return () => {
      mLoader.remove();
    };
  });
  return mLoader;
};

export default useLoader;
