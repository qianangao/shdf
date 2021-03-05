import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import React, { Component } from 'react';
import DataSet from '@antv/data-set';
import { connect } from 'umi';
import Debounce from 'lodash.debounce';
import autoHeight from '../autoHeight';
import styles from '../index.less';

connect(({ dictionaryMgt }) => ({
  dictionaryMgt,
}));
class Bar extends Component {
  state = {
    autoHideXLabels: false,
    darasouceArr: [],
    darasouce: [],
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
    const { dispatch } = this.props;
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getInfoStatisticsData',
        payload: { current: 1, pageSize: 10 },
        resolve,
      });
    }).then(res => {
      const arr1 = [
        {
          name: '信息填报数量',
        },
        {
          name: '信息发布数量',
        },
      ];
      if (res instanceof Array) {
        res.forEach(item => {
          arr1[0][item.reportProvince] = item.informationFillInNum;
          arr1[1][item.reportProvince] = item.informationReleaseNum;
        });
        const darasouceArr1 = res.map(element => {
          return element.reportProvince;
        });
        this.setState({
          darasouceArr: darasouceArr1,
          darasouce: arr1,
        });
      }
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
    const { height = 1 } = this.props;
    const ds = new DataSet();
    const dv = ds.createView().source(this.state.darasouce);

    dv.transform({
      type: 'fold',
      fields: this.state.darasouceArr,
      key: '省份',
      value: '数量',
    });

    return (
      <div
        className={styles.chart}
        style={{
          height,
        }}
        ref={this.handleRoot}
      >
        <div ref={this.handleRef}>
          <Chart height={400} data={dv} forceFit>
            <Axis name="省份" />
            <Axis name="数量" />
            <Legend />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom
              type="interval"
              position="省份*数量"
              color="name"
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
