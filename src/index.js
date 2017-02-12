require('normalize.css/normalize.css');
import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Trend from './components/Trend';

// If you have another dataset format,
// please reformat it by yourself to [{x:Number,y:Number},...]
const trendDataset = '20161112:77,20161118:77,20161124:80,20161130:80,20161206:82,20161212:80,20161218:79,20161224:73,20161230:82,20170105:83,20170111:85,20170117:83,20170123:79,20170129:78,20170204:80,20170210:81';

ReactDOM.render(
  (
    <section>
      <Trend
        dataset={trendDataset}
        bucket={1}
        useCurve={true}
      />
      <Trend
        dataset={trendDataset}
        bucket={1}
        useCurve={false}
      />
    </section>
  ),
  document.getElementById('app')
);
