import { useEffect, useRef } from 'react';

export const useDidMount = () => {
  const didMount = useRef(false);
  useEffect(() => {
    didMount.current = true;
  }, []);
  return didMount.current;
};
