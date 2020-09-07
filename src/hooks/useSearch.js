import { useState, useEffect, useCallback } from 'react';

function useSearch(ref, itemArray, func, clear, isSearching) {
  //console.log(foodsArray);
  const [items, setItems] = useState([]);

  const changeItems = useCallback(() => {
    if (clear && !isSearching) setItems(itemArray);
    setItems(
      itemArray.filter((item) => {
      let _items;
      try{
       _items= func(ref.current.value, item);
        }
        catch(err){
        _items= itemArray
        }
       return _items
       
        
      })
    );
  }, [itemArray, func, ref, clear, isSearching]);
  useEffect(() => {
    setItems(itemArray);
    const node = ref.current;
    if (node) {
      node.addEventListener('input', changeItems);

      return () => {
        node.removeEventListener('input', changeItems);
        //node.removeEventListener('blur', handleBlur);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, itemArray, clear, isSearching]);

  return items;
}

export default useSearch;
