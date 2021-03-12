import React, { useEffect, useRef, useState } from 'react';
import BarStacked from '@/components/Charts/BarStacked/index';
import { Button, Card, Col, Form, DatePicker, Row, Select } from 'antd';
import { connect } from 'umi';

const { RangePicker } = DatePicker;

const AddThreadForm = ({ dispatch, statistical }) => {
  const { engineering, analysisType } = statistical;
  const [form] = Form.useForm();
  const [chartData, setChartData] = useState([]);
  const ChildPage = useRef({});

  const getTreeData = () => {
    /* eslint-disable no-new */
    new Promise(resolve => {
      dispatch({
        type: 'statistical/getEngineeringTree',
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
                analysisType: 1,
                startTime: '',
                endTime: '',
                source: '1',
                handleState: 1,
                importanceLevel: '1',
                regionCode: '100000',
                urgentLevel: '1',
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
                <Form.Item label="时间范围" name="handleState">
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="联防工程" name="engineeringIds">
                  <Select mode="multiple" allowClear>
                    {engineering &&
                      engineering.map((item: any) => (
                        <Select.Option key={item.key} value={item.key}>
                          {item.title}
                        </Select.Option>
                      ))}
                  </Select>
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

      <BarStacked dispatch={dispatch} actionRef={ChildPage} chartData={chartData} />
    </Row>
  );
};

export default connect(({ statistical }) => ({
  statistical,
}))(AddThreadForm);
