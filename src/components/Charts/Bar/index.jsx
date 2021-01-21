import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
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
      data,
      datagroup,
      color = 'rgba(24, 144, 255, 0.85)',
      showLegend,
      padding,
      active,
      events,
    } = this.props;
    const { autoHideXLabels } = this.state;
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
            forceFit={forceFit}
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
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom
              type="interval"
              position="x*y"
              color={color}
              active={active}
              adjust={datagroup ? [{ type: 'dodge' }] : null}
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
