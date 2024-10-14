import _ from 'lodash';
import { useEffect, useState } from 'react';

const useResize = () => {
  const [width, setWidth] = useState<number>(
    document.documentElement.offsetWidth
  );

  useEffect(() => {
    const getWidth = () =>
      _.throttle(() => setWidth(document.documentElement.offsetWidth), 500);
    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

  return width;
};

export default useResize;
