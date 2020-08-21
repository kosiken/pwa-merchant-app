import { useState, useEffect, useCallback } from 'react';

function useSearch(ref, itemArray, func) {
  //console.log(foodsArray);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(itemArray);
    const node = ref.current;
    if (node) {
      node.addEventListener('input', changeItems);
      // node.addEventListener('blur', handleBlur);

      return () => {
        node.removeEventListener('input', changeItems);
        //node.removeEventListener('blur', handleBlur);
      };
    }
  }, [ref, itemArray]);
  const changeItems = useCallback(
    (e) => {
      setItems(
        itemArray.filter((l) => {
          return func(ref.current.value, l);
        })
      );
    },
    [itemArray, func, ref]
  );

  return items;
}

export default useSearch;
