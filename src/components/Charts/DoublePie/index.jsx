import { Chart, Coord, Legend, Geom, View, Label, Tooltip } from 'bizcharts';
import React, { Component } from 'react';

import { DataView } from '@antv/data-set';
import ReactFitText from 'react-fittext';
import classNames from 'classnames';
import autoHeight from '../autoHeight';
import styles from '../index.less';

class DoublePie extends Component {
  root = undefined;

  handleRoot = n => {
    this.root = n;
  };

  render() {
    const {
      hasLegend = false,
      className,
      data = [],
      data2 = [],
      title,
      selected = true,
      tooltip = true,
      style,
      height = 0,
      forceFit = true,
      animate = true,
      lineWidth = 1,
    } = this.props;
    const pieClassName = classNames(className);
    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const tooltipFormat = [
      'x*y*percent',
      (x, y, p) => ({
        name: x,
        value: `${y}  ${(p * 100).toFixed(2)}%`,
      }),
    ];
    const padding = [0, 100, 0, 100];
    const dv = new DataView();
    const dv2 = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'y',
      dimension: 'x',
      as: 'percent',
    });
    dv2.source(data2).transform({
      type: 'percent',
      field: 'y',
      dimension: 'x',
      as: 'percent',
    });
    return (
      <div ref={this.handleRoot} className={pieClassName} style={style}>
        <ReactFitText maxFontSize={25}>
          <Chart
            scale={scale}
            height={height}
            forceFit={forceFit}
            data={dv}
            padding={padding}
            animate={animate}
          >
            {!!title && <span className={styles.chartTitle}>{title}</span>}
            {!!tooltip && <Tooltip showTitle={false} />}
            {!!hasLegend && <Legend name="x" position="right-center" />}
            <Coord type="theta" radius={0.8} innerRadius={0.65} />
            <Geom
              style={{
                lineWidth,
                stroke: '#fff',
              }}
              tooltip={tooltip ? tooltipFormat : undefined}
              type="intervalStack"
              position="percent"
              color={['x']}
              selected={selected}
            >
              <Label content="x" offset={20} />
            </Geom>
            <View data={dv2} scale={scale}>
              <Coord type="theta" radius={0.45} />
              <Geom
                type="intervalStack"
                position="percent"
                color={['x', ['#945FB9', '#DECFEA', '#FF9845', '#FFE0C7', '#1E9493', '#BBDEDE']]}
                tooltip={tooltip ? tooltipFormat : undefined}
                style={{
                  lineWidth,
                  stroke: '#fff',
                }}
                selected={selected}
              >
                <Label content="x" offset={-10} autoRotate={false} />
              </Geom>
            </View>
          </Chart>
        </ReactFitText>
      </div>
    );
  }
}

export default autoHeight()(DoublePie);
