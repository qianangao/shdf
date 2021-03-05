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
          analysisType: 1,
          startTime: '',
          endTime: '',
          source: '1',
          handleState: 1,
          importanceLevel: '1',
          regionCode: '100000',
          urgentLevel: '1',
          specialActionIds: [123, 456],
        },
        resolve,
      });
    }).then(res => {
      const beforeData = res;
      const tempArr = [];
      const afterData = [];
      for (let i = 0; i < beforeData.length; i++) {
        if (tempArr.indexOf(beforeData[i]['地域']) === -1) {
          afterData.push({
            name: beforeData[i]['地域'],
            origin: [beforeData[i]],
          });
          tempArr.push(beforeData[i]['地域']);
        } else {
          for (let j = 0; j < afterData.length; j++) {
            if (afterData[j].name === beforeData[i]['地域']) {
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
      this.setState({
        datasouce: afterData,
      });
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
    const dv = ds.createView().source(this.state.datasouce);
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
