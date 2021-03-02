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
import DataSet from '@antv/data-set';

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
      darasouceArr,
      data,
    } = this.props;
    const { autoHideXLabels } = this.state;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: darasouceArr,
      // 展开字段集
      key: '月份',
      // key字段
      value: '月均降雨量', // value字段
    });
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
          {/* <Chart
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
          </Chart> */}
          <Chart height={400} data={dv} forceFit>
            <Axis name="月份" />
            <Axis name="月均降雨量" />
            <Legend />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom
              type="interval"
              position="月份*月均降雨量"
              color={'name'}
              adjust={[
                {
                  type: 'dodge',
                  marginRatio: 1 / 32,
                },
              ]}
            />
          </Chart>
        </div>
      </div>
    );
  }
}

export default autoHeight()(Bar);
