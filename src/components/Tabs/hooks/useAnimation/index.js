import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { getTranslateX } from '../../utils/animation';

function useAnimation({ type = 0, minTranslateX }) {
  const [translateX, setTranslateX] = useState(0);
  const [lastTranslateX, setLastTranslateX] = useState(translateX);

  function handleSwiping(eventData) {
    const { dir, deltaX } = eventData;
    const newTranslateX = getTranslateX({
      dir,
      deltaX,
      lastTranslateX,
      minTranslateX
    });
    setTranslateX(newTranslateX);
  }

  function handleSwiped(eventData) {
    const { dir, deltaX } = eventData;
    if (['Left', 'Right'].includes(dir)) {
      const newTranslateX = getTranslateX({
        dir,
        deltaX,
        lastTranslateX,
        minTranslateX
      });
      setLastTranslateX(newTranslateX);
    }
  }

  const handlers = useSwipeable({
    onSwiping: handleSwiping,
    onSwiped: handleSwiped
  });

  return {
    handlers,
    translateX
  };
}

export default useAnimation;
