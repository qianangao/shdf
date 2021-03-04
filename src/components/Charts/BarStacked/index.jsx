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
import { connect } from 'umi';
import Debounce from 'lodash.debounce';
import autoHeight from '../autoHeight';
import styles from '../index.less';
connect(({ dictionaryMgt, global }) => ({
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
    return;
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getInfoStatisticsData',
        payload: { current: 1, pageSize: 10 },
        resolve,
      });
    }).then(res => {
      let arr1 = [
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
        let darasouceArr1 = res.map(element => {
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
    } = this.props;
    const data = [
      {
        State: 'WY',
        小于5岁: 25635,
        '5至13岁': 1890,
        '14至17岁': 9314,
      },
      {
        State: 'DC',
        小于5岁: 30352,
        '5至13岁': 20439,
        '14至17岁': 10225,
      },
      {
        State: 'VT',
        小于5岁: 38253,
        '5至13岁': 42538,
        '14至17岁': 15757,
      },
      {
        State: 'ND',
        小于5岁: 51896,
        '5至13岁': 67358,
        '14至17岁': 18794,
      },
      {
        State: 'AK',
        小于5岁: 72083,
        '5至13岁': 85640,
        '14至17岁': 22153,
      },
    ];
    const { autoHideXLabels } = this.state;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['小于5岁', '5至13岁', '14至17岁'],
      // 展开字段集
      key: '年龄段',
      // key字段
      value: '人口数量',
      // value字段
      retains: ['State'], // 保留字段集，默认为除fields以外的所有字段
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
            <Legend />
            <Coord transpose />
            <Axis
              name="State"
              label={{
                offset: 12,
              }}
            />
            <Axis name="人口数量" />
            <Tooltip />
            <Geom type="intervalStack" position="State*人口数量" color={'年龄段'} />
          </Chart>
        </div>
      </div>
    );
  }
}

export default autoHeight()(Bar);
