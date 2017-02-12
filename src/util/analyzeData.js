
// Deal with string dataset. This could be better performance
const REG_DATASET_PAIR = /\d{8}:[\d.-]+/;
const transferStrToArr = str => str
  .split(',')
  .filter(s => REG_DATASET_PAIR.test(s))
  .map(s => s
    .split(':')
    .map((x, i) =>
      i ? parseInt(x, 10) :
        (new Date(
          x.slice(0, 4),
          parseInt(x.substr(4, 2), 10) - 1,
          x.substr(6, 2)
        )).getTime()
    )
  )
  // ensure dataset is orderd by x-axis arranged from smallest to largest.
  .sort(([x1], [x2]) => x1 - x2);

/**
 * analyze data
 * @param dataset
 *    shape of: '20161112:67,20161118:65' or [{x:20161112,y:67},{x:20161118,y:65}]
 * @returns {{}}
 *    shape of: {
 *      xArr: [20161112, 67],
 *      yArr: [20161118, 65],
 *      minX: 20161112,
 *      maxX: 20161118,
 *      minY: 65,
 *      maxY: 67
 *    }
 */
export default function analyzeData(dataset) {
  // pretreatment
  if (typeof dataset === 'string') {
    dataset = transferStrToArr(dataset);
  }
  // use the most basic iterate method to get the best performance
  let i = 0;
  const length = dataset.length;
  const xArr = new Array(length);
  const yArr = new Array(length);
  let temp = null;
  while (i < length) {
    temp = dataset[i];
    xArr[i] = temp[0];
    yArr[i] = temp[1];
    i++;
  }
  const {max, min} = Math;
  return {
    xArr, yArr,
    // Hack looks simpler...
    maxX: max(...xArr),
    maxY: max(...yArr),
    minX: min(...xArr),
    minY: min(...yArr),
  }
}
