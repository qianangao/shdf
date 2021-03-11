import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import React, { Component } from 'react';
import { connect } from 'umi';
import Debounce from 'lodash.debounce';
import autoHeight from '../autoHeight';
import styles from '../index.less';

connect(({ statistical }) => ({
  statistical,
}));
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
    const { chartData } = this.props;
    const cols = {
      time: {
        range: [0, 1],
      },
    };

    return (
      <div className={styles.chart} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart height={400} data={chartData} scale={cols} forceFit>
            <Legend />
            <Axis name="time" />
            <Axis
              name="num"
              // label={{
              //   formatter: val => `${val}°C`,
              // }}
            />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom type="line" position="time*num" size={2} color="name" shape="smooth" />
            <Geom
              type="point"
              position="time*num"
              size={4}
              shape="circle"
              color="name"
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
            />
          </Chart>
        </div>
      </div>
    );
  }
}

export default autoHeight()(Bar);
