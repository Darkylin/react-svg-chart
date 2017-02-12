function translate(curr, min, range, slideLength, isY) {
  const num = Math.round((curr - min) / range * slideLength);
  if (isY) {
    return slideLength - num;
  }
  return num;
}

export default function drawerBuilder({maxX, maxY, minX, minY}, width, height, useCurve) {
  const rangeX = maxX - minX;
  const rangeY = maxY - minY;
  const reduceFnStraight = (x, y, prev, lastX, lastY, nextX, nextY) => (
    `${prev}L${translate(x, minX, rangeX, width)},` +
    `${translate(y, minY, rangeY, height, true)}`
  );
  const reduceFnCurve = (x1, y1, prev, lastX, lastY, nextX, nextY) => {
    return `${prev}L${translate(x1, minX, rangeX, width)},${translate(y1, minY, rangeY, height, true)}`;
  };
  return useCurve ? reduceFnCurve : reduceFnStraight;
}
