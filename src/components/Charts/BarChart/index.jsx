import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import React, { Component } from 'react';

import Debounce from 'lodash.debounce';
import autoHeight from '../autoHeight';
import styles from '../index.less';

class Bar extends Component {
  state = {
    autoHideXLabels: false,
  };

  root = undefined;

  node = undefined;

  resize = Debounce(() => {
    if (!this.node || !this.node.parentNode) {
      return;
    }

    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;

    if (!autoLabel) {
      return;
    }

    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }, 500);

  componentDidMount() {
    window.addEventListener('resize', this.resize, {
      passive: true,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleRoot = n => {
    this.root = n;
  };

  handleRef = n => {
    this.node = n;
  };

  render() {
    const {
      height = 1,
      title,
      forceFit = true,
      datagroup,
      color = 'rgba(24, 144, 255, 0.85)',
      showLegend,
      padding,
      active,
      events,
    } = this.props;
    const { autoHideXLabels } = this.state;
    const data = [
      {
        name: 'London',
        'Jan.': 18.9,
        'Feb.': 28.8,
        'Mar.': 39.3,
        'Apr.': 81.4,
        May: 47,
        'Jun.': 20.3,
        'Jul.': 24,
        'Aug.': 35.6,
      },
      {
        name: 'Berlin',
        'Jan.': 12.4,
        'Feb.': 23.2,
        'Mar.': 34.5,
        'Apr.': 99.7,
        May: 52.6,
        'Jun.': 35.5,
        'Jul.': 37.4,
        'Aug.': 42.4,
      },
    ];
    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };
    return (
      <div
        className={styles.chart}
        style={{
          height,
        }}
        ref={this.handleRoot}
      >
        <div ref={this.handleRef}>
          <Chart
            scale={scale}
            height={title ? height - 41 : height}
            forceFit
            data={data}
            padding={padding || 'auto'}
            {...events}
          >
            {!!title && <span className={styles.chartTitle}>{title}</span>}
            <Axis
              name="x"
              title={false}
              label={autoHideXLabels ? undefined : {}}
              tickLine={autoHideXLabels ? undefined : {}}
            />
            <Axis name="y" min={0} />
            {showLegend && <Legend position="right" />}
            <Tooltip
              showTitle={false}
              crosshairs={false}
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom
              type="interval"
              position="x*y"
              color={color}
              active={active}
              adjust={[
                {
                  type: 'dodge',
                  marginRatio: 1 / 32,
                },
              ]}
              style={{
                cursor: active ? 'pointer' : 'default',
              }}
            />
          </Chart>
        </div>
      </div>
    );
  }
}

export default autoHeight()(Bar);
