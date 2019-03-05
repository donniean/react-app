function getTranslateX({ dir, deltaX, lastTranslateX, minTranslateX }) {
  const computedTranslateX = lastTranslateX - deltaX;
  let newTranslateX = 0;
  if (dir === 'Left') {
    if (computedTranslateX > minTranslateX) {
      newTranslateX = computedTranslateX;
    } else {
      newTranslateX = minTranslateX;
    }
  } else if (dir === 'Right') {
    if (computedTranslateX < 0) {
      newTranslateX = computedTranslateX;
    } else {
      newTranslateX = 0;
    }
  }
  return newTranslateX;
}

function getTabPanelTranslateX({
  dir,
  deltaX,
  lastTranslateX,
  minTranslateX,
  containerWidth
}) {
  const computedTranslateX = lastTranslateX - deltaX;
  let newTranslateX = 0;
  if (dir === 'Left') {
    if (computedTranslateX > minTranslateX) {
      newTranslateX = computedTranslateX;
    } else {
      newTranslateX = minTranslateX;
    }
  } else if (dir === 'Right') {
    if (computedTranslateX < 0) {
      newTranslateX = computedTranslateX;
    } else {
      newTranslateX = 0;
    }
  }
  return newTranslateX;
}

export { getTranslateX };
