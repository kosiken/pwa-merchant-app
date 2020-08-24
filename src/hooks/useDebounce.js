import { useEffect, useState } from 'react';

/**
 * Debounce the change of given value
 *
 * @param value value changes will only be returned after timeout
 * @param timeout timeout in ms passed to setTimeout()
 */
const useDebounce = (value, timeout) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (value) setState(true);
    const handler = setTimeout(() => setState(false), timeout);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return state;
};

export default useDebounce;
