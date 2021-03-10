import React, { useEffect, useState } from 'react';
import BarStacked from '@/components/Charts/BarStacked/index';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';
import { Button, Card, Col, Form, DatePicker, Row, Select, message } from 'antd';
import { connect } from 'umi';

const { RangePicker } = DatePicker;

const Case = ({ dispatch, statistical }) => {
  const { specialAction, analysisType } = statistical;
  const [form] = Form.useForm();
  const [chartData, setChartData] = useState([]);
  const getTreeData = () => {
    /* eslint-disable no-new */
    new Promise(resolve => {
      dispatch({
        type: 'statistical/getSpecialActionTree',
        payload: {},
        resolve,
      });
    });
  };
  const getChartData = (filed = null) => {
    new Promise(resolve => {
      dispatch({
        type: 'statistical/getAnaStatistics',
        payload:
          filed !== null
            ? filed
            : {
                analysisType,
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
    }).then((res: any) => {
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
      setChartData([...afterData]);
    });
  };
  const onFinish = filed => {
    filed.analysisType = analysisType;
    if (filed.regionCode1) {
      if (filed.regionCode1.value.split('/').length > 2) {
        message.warning('地域选择只能选择到市级');
        return;
      }
      filed.regionCode = filed.regionCode1.value.split('/')[
        filed.regionCode1.value.split('/').length - 1
      ];
    }
    if (filed.timeRange) {
      filed.startTime = filed.timeRange[0].format('YYYY-MM-DD');
      filed.endTime = filed.timeRange[1].format('YYYY-MM-DD');
    }
    getChartData(filed);
  };
  useEffect(() => {
    getTreeData();
    getChartData();
  }, []);
  const handleSearch = () => {};
  const resetFrom = () => {
    form.resetFields();
  };
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Row justify="space-between">
      <Col span={24}>
        <Form form={form} onFinish={onFinish} {...formItemLayout} onSubmit={handleSearch}>
          <Card>
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item label="时间范围" name="timeRange">
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="来源" name="source">
                  <Select>
                    <Select.Option key={12311} value="0">
                      网络
                    </Select.Option>
                    <Select.Option key={1213} value="1">
                      信函
                    </Select.Option>
                    <Select.Option key={1321} value="1">
                      电话
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="办理状态" name="handleState">
                  <Select>
                    <Select.Option key={0} value={0}>
                      办理中
                    </Select.Option>
                    <Select.Option key={1} value={1}>
                      已超时
                    </Select.Option>
                    <Select.Option key={2} value={2}>
                      已办结
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="专项工程" name="specialActionIds">
                  <Select mode="multiple" allowClear>
                    {specialAction &&
                      specialAction.map((item: any) => (
                        <Select.Option key={item.key} value={item.key}>
                          {item.title}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="重要程度" name="importanceLevel">
                  <Select>
                    <Select.Option key={0} value="0">
                      一般
                    </Select.Option>
                    <Select.Option key={1} value="1">
                      重要
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="紧急程度" name="urgentLevel">
                  <Select>
                    <Select.Option key={32131} value="0">
                      非紧急
                    </Select.Option>
                    <Select.Option key={132131} value="1">
                      平急
                    </Select.Option>
                    <Select.Option key={13131} value="1">
                      加急
                    </Select.Option>
                    <Select.Option key={1313131} value="1">
                      特急
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="选择地域" name="regionCode1">
                  <ProvinceCascaderInput />
                </Form.Item>
              </Col>
              <Col span={10} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button onClick={resetFrom}>重置</Button>
                <Button type="primary" style={{ marginLeft: 10 }} htmlType="submit">
                  统计
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
      </Col>

      <BarStacked dispatch={dispatch} chartData={chartData} />
    </Row>
  );
};

export default connect(({ statistical }) => ({
  statistical,
}))(Case);
