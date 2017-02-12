// Make a path according to the limit of data size
export default function pathMaker(data, drawingFn) {
  let pathData = '';
  const {xArr, yArr} = data;
  const lim = xArr.length;
  let i = 0;
  while (i < lim) {
    pathData = drawingFn(xArr[i], yArr[i], pathData, xArr[i + 1], yArr[i + 1]);
    i++;
  }
  return 'M' + pathData.slice(1);
}
