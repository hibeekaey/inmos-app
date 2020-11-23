import React, {PureComponent} from 'react';
import {StackedAreaChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {StyleSheet} from 'react-native';

export default class StackedFooter extends PureComponent {
  render() {
    const data = [
      {
        layer1: 3840,
        layer2: 1920,
        layer3: 960,
        layer4: 400,
      },
      {
        layer1: 1600,
        layer2: 1440,
        layer3: 960,
        layer4: 400,
      },
      {
        layer1: 640,
        layer2: 960,
        layer3: 3640,
        layer4: 400,
      },
      {
        layer1: 3320,
        layer2: 480,
        layer3: 640,
        layer4: 400,
      },
    ];

    const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff'];
    const keys = ['layer1', 'layer2', 'layer3', 'layer4'];

    return (
      <StackedAreaChart
        style={[styles.stackedFooter, ...this.props.style]}
        data={data}
        keys={keys}
        colors={colors}
        curve={shape.curveNatural}
        showGrid={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  stackedFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
    zIndex: -1,
    opacity: 0,
  },
});
