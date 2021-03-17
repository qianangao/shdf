import React, { useEffect, useState } from 'react';
import BarStacked from '@/components/Charts/BrokenLine/index';
import { Button, Card, Col, Form, DatePicker, Row, Select } from 'antd';
import { connect } from 'umi';

const { RangePicker } = DatePicker;

const AddThreadForm = ({ dispatch, statistical }) => {
  const { engineering, analysisType } = statistical;
  const [form] = Form.useForm();
  const [chartData, setChartData] = useState([]);
  const searchData = {};
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
    /* eslint-disable no-new */
    new Promise(resolve => {
      dispatch({
        type: 'trendStatistics/getTrendStatistics',
        payload:
          filed !== null
            ? filed
            : {
                analysisType,
                startTime: '2021-02-01',
                endTime: '2021-02-05',
                source: '1',
                handleState: 1,
                importanceLevel: '1',
                regionCode: '110000',
                urgentLevel: '1',
              },
        resolve,
      });
    }).then(res => {
      if (res && res.length > 0) {
        const arr = [];
        res.forEach(item => {
          arr.push({
            name: item.name,
            num: item['数量'],
            time: item['时间'],
          });
        });
        setChartData([...arr]);
      }
    });
  };
  const onFinish = filed => {
    filed.analysisType = analysisType;
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
              <Col span={8}>
                <Form.Item label="时间范围" name="timeRange">
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={8}>
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
              <Col span={8} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button onClick={resetFrom}>重置</Button>
                <Button type="primary" style={{ marginLeft: 10 }} htmlType="submit">
                  统计
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
      </Col>

      {/* <BarStacked
        dispatch={dispatch}
        actionRef={ChildPage}
        searchData={searchData}
        chartData={chartData}
      /> */}
      <Card style={{ width: '100%', height: '60vh', marginTop: '30px' }}>
        <BarStacked dispatch={dispatch} searchData={searchData} chartData={chartData} />
      </Card>
    </Row>
  );
};

export default connect(({ statistical }) => ({
  statistical,
}))(AddThreadForm);
