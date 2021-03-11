import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import React, { Component } from 'react';
import DataSet from '@antv/data-set';
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
    const typeList = ['政治性', '民族宗教', '淫秽色情', '三假', '涉幼', '侵权盗版', '非法出版'];
    const ds = new DataSet();
    const { chartData } = this.props;
    if (chartData === [] || chartData.length === 0) {
      return <div> </div>;
    }
    const dv = ds.createView().source(chartData);
    dv.transform({
      type: 'fold',
      fields: typeList,
      key: '年龄段',
      value: '人口数量',
      retains: ['name'],
    });

    return (
      <div className={styles.chart} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart height={400} data={dv} forceFit>
            <Legend />
            <Coord transpose />
            <Axis
              name="name"
              label={{
                offset: 12,
              }}
            />
            <Axis name="人口数量" />
            <Tooltip />
            <Geom type="intervalStack" position="name*人口数量" color="年龄段" />
          </Chart>
        </div>
      </div>
    );
  }
}

export default autoHeight()(Bar);
