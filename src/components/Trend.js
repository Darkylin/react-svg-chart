require('styles/trend.scss');

import React from 'react';
const {oneOfType, oneOf, bool, string, arrayOf, shape, number} = React.PropTypes;

import analyzeData from '../util/analyzeData';
import drawerBuilder from '../util/lineDrawerBuilder';
import makePath from '../util/makePath';


// TODO error dataset fallback
export default class AppComponent extends React.Component {
  static propTypes = {
    dataset: oneOfType([
      string,
      arrayOf(shape({x: number, y: number}).isRequired)
    ]).isRequired,
    xSpace: oneOf(['day', 'month', 'year', 'auto']),
    useCurve: bool,
    animate: bool,
    // SVG's width when there is no width limit on it.
    // No need to pay mush attention on it, cause SVG is vectorial.
    width: number,
    aspectRatio: number,
    curveRadius: number
  };
  static defaultProps = {
    xSpace: 'auto',
    useCurve: false,
    animate: true,
    width: 375,
    aspectRatio: 0.6,
    curveRadius: 10
  };

  componentDidMount() {

  }

  render() {
    const {dataset, useCurve, width,aspectRatio} = this.props;
    const analysisResult = analyzeData(dataset);
    // Find the right drawer.
    const height=width*aspectRatio;
    const drawer = drawerBuilder(analysisResult, width, height, useCurve);
    // Get the path data.
    const path = makePath(analysisResult, drawer);
    let region = `${path},`;
    return (
      <svg viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <clipPath id="clipPath">
            <rect x="0" y="0" width="0" height={height} className="svg-trend-animate"/>
          </clipPath>
          <linearGradient id="svg-trend-gradient">
            <stop offset="0" stopColor="#00d5bd"/>
            <stop offset="100" stopColor="#24c1ed"/>
          </linearGradient>
        </defs>
        <path d={path} stroke="red" strokeWidth="3" fill="none" clipPath="url(#clipPath)"/>
      </svg>
    )
  }
}



