import { useState, useEffect, useCallback } from 'react';

function useSearch(ref, itemArray, func) {
  //console.log(foodsArray);
  const [items, setItems] = useState([]);
  const changeItems = useCallback(() => {
    setItems(
      itemArray.filter((item) => {
        return func(ref.current.value, item);
      })
    );
  }, [itemArray, func, ref]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, itemArray]);

  return items;
}

export default useSearch;
