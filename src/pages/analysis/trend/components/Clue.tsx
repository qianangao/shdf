import React, { useEffect, useState } from 'react';
import BrokenLine from '@/components/Charts/BrokenLine/index';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';
import { Button, Card, Col, Form, DatePicker, Row, Select } from 'antd';
import { connect } from 'umi';

const { RangePicker } = DatePicker;

const AddThreadForm = ({ dispatch, statistical }) => {
  const { engineering, analysisType } = statistical;
  const [form] = Form.useForm();
  const searchData = {};
  const [chartData, setChartData] = useState([]);
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
    if (filed.regionCode1) {
      filed.regionCode = filed.regionCode1.value.split('/')[
        filed.regionCode1.value.split('/').length - 1
      ];
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
  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: '请选择时间区间' }],
  };
  return (
    <Row justify="space-between">
      <Col span={24}>
        <Form form={form} onFinish={onFinish} {...formItemLayout} onSubmit={handleSearch}>
          <Card>
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item label="时间范围" name="timeRange" {...rangeConfig}>
                  <RangePicker format="YYYY-MM-DD" />
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
                    <Select.Option key={13131} value="2">
                      加急
                    </Select.Option>
                    <Select.Option key={1313131} value="3">
                      特急
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="选择地域"
                  name="regionCode1"
                  rules={[{ required: true, message: '请选择地域编码' }]}
                >
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
      {/* <Col span={7}>
        <Card style={{ width: '35%', height: '30vh' }}>
          <Button onClick={() => {}}>更 多 项</Button>
        </Card>
      </Col> */}
      <BrokenLine dispatch={dispatch} searchData={searchData} chartData={chartData} />
    </Row>
  );
};

export default connect(({ statistical }) => ({
  statistical,
}))(AddThreadForm);
