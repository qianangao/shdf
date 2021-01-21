import { Chart, Coord, Geom, Tooltip, Label, Legend } from 'bizcharts';
import React, { Component } from 'react';

import { DataView } from '@antv/data-set';
import ReactFitText from 'react-fittext';
import classNames from 'classnames';
import autoHeight from '../autoHeight';
import styles from '../index.less';

class Pie extends Component {
  render() {
    const {
      title,
      hasLegend = false,
      className,
      style,
      height = 0,
      forceFit = true,
      percent,
      color,
      inner = 0,
      animate = true,
      colors,
      lineWidth = 1,
    } = this.props;
    const pieClassName = classNames(className);
    const {
      data: propsData,
      selected: propsSelected = true,
      tooltip: propsTooltip = true,
    } = this.props;
    let data = propsData || [];
    let selected = propsSelected;
    let tooltip = propsTooltip;
    const defaultColors = colors;
    data = data || [];
    selected = selected || true;
    tooltip = tooltip || true;
    let formatColor;
    const scale = {
      x: {
        type: 'cat',
        range: [0, 1],
      },
      y: {
        min: 0,
      },
    };

    if (percent || percent === 0) {
      selected = false;
      tooltip = false;

      formatColor = value => {
        if (value === '占比') {
          return color || 'rgba(24, 144, 255, 0.85)';
        }

        return '#F0F2F5';
      };

      data = [
        {
          x: '占比',
          y: parseFloat(`${percent}`),
        },
        {
          x: '反比',
          y: 100 - parseFloat(`${percent}`),
        },
      ];
    }

    const tooltipFormat = [
      'x*percent',
      (x, p) => ({
        name: x,
        value: `${(p * 100).toFixed(2)}%`,
      }),
    ];
    const padding = [12, 0, 12, 0];
    const dv = new DataView();
    dv.source(data).transform({
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
            <Coord type="theta" radius={0.8} innerRadius={inner} />
            <Geom
              style={{
                lineWidth,
                stroke: '#fff',
              }}
              tooltip={tooltip ? tooltipFormat : undefined}
              type="intervalStack"
              position="percent"
              color={['x', percent || percent === 0 ? formatColor : defaultColors]}
              selected={selected}
            >
              <Label content="x" offset={20} />
            </Geom>
          </Chart>
        </ReactFitText>
      </div>
    );
  }
}

export default autoHeight()(Pie);
