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
connect(({ statistical, global }) => ({
  dictionaryMgt,
}));
class Bar extends Component {
  state = {
    autoHideXLabels: false,
    datasouce: [],
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
        type: 'statistical/getAnaStatistics',
        payload: {
          analysisType: 1, //统计类型 1案件  2线索  3非法出版物 4敏感事件
          startTime: '', //时间区间-开始时间
          endTime: '', //时间区间-结束时间
          source: '1', //来源
          handleState: 1, //办理状态 0、办理中 1、已超时 2、已办结
          importanceLevel: '1', //重要程度 0一般  1重要
          regionCode: '100000', //选择地域
          urgentLevel: '1', //紧急程度
          specialActionIds: [
            //专项行动ID
            123,
            456,
          ],
        },
        resolve,
      });
    }).then(res => {
      let beforeData = res;
      let tempArr = [];
      let afterData = [];
      let type = ['政治性', '民族宗教', '淫秽色情', '三假', '涉幼', '侵权盗版', '非法出版'];
      for (let i = 0; i < beforeData.length; i++) {
        if (tempArr.indexOf(beforeData[i]['地域']) === -1) {
          afterData.push({
            name: beforeData[i]['地域'],
            origin: [beforeData[i]],
          });
          tempArr.push(beforeData[i]['地域']);
        } else {
          for (let j = 0; j < afterData.length; j++) {
            if (afterData[j].name == beforeData[i]['地域']) {
              afterData[j].origin.push(beforeData[i]);
              break;
            }
          }
        }
      }

      afterData.forEach(item => {
        item.origin.forEach(ele => {
          item[ele.name] = ele['数量'];
        });
      });
      console.log(afterData);
      // console.log(tempArr);
      this.setState({
        datasouce: afterData,
      });
      return;
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    this.setState = (state, callback) => {
      return;
    };
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
    const typeList = ['政治性', '民族宗教', '淫秽色情', '三假', '涉幼', '侵权盗版', '非法出版'];
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
    const dv = ds.createView().source(this.state.datasouce);
    dv.transform({
      type: 'fold',
      fields: typeList,
      // 展开字段集
      key: '年龄段',
      // key字段
      value: '人口数量',
      // value字段
      retains: ['name'], // 保留字段集，默认为除fields以外的所有字段
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
              name="name"
              label={{
                offset: 12,
              }}
            />
            <Axis name="人口数量" />
            <Tooltip />
            <Geom type="intervalStack" position="name*人口数量" color={'年龄段'} />
          </Chart>
        </div>
      </div>
    );
  }
}

export default autoHeight()(Bar);
