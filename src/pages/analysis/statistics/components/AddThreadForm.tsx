import React from 'react';

import { Button, Card, Col, Form, DatePicker, Row, Select } from 'antd';
const { RangePicker } = DatePicker;
const AddThreadForm = ({}) => {
  const [form] = Form.useForm();
  const onFinish = (fieldsValue: any) => {
    console.log('🚀 ~ file: AddThreadForm.tsx ~ line 8 ~ onFinish ~ fieldsValue', fieldsValue);
    return;
    // Should format date value before submit.
    const rangeValue = fieldsValue['range-picker'];
    const rangeTimeValue = fieldsValue['range-time-picker'];
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
      'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
      'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      'range-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
  };

  // const rangeConfig = {
  //   rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
  // };
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Row justify="space-between">
      <Col span={17}>
        <Form form={form} onFinish={onFinish} {...formItemLayout}>
          <Card>
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item label="选择业务类型" name="analysisType">
                  <Select>
                    <Select.Option key={1} value={1}>
                      案件
                    </Select.Option>
                    <Select.Option key={2} value={2}>
                      线索
                    </Select.Option>
                    <Select.Option key={3} value={3}>
                      非法出版物
                    </Select.Option>
                    <Select.Option key={4} value={4}>
                      敏感事件
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}></Col>
              <Col span={10}>
                <Form.Item label="时间范围" name="handleState">
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="来源" name="readingState">
                  <Select>
                    <Select.Option key={0} value={0}>
                      网络
                    </Select.Option>
                    <Select.Option key={1} value={1}>
                      信函
                    </Select.Option>
                    <Select.Option key={1} value={1}>
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
                <Form.Item label="专项工程" name="readingState">
                  <Select>
                    <Select.Option key={0} value={0}>
                      未处理
                    </Select.Option>

                    <Select.Option key={1} value={1}>
                      已处理
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="重要程度" name="importanceLevel">
                  <Select>
                    <Select.Option key={0} value={0}>
                      一般
                    </Select.Option>
                    <Select.Option key={1} value={1}>
                      重要
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="紧急程度" name="urgentLevel">
                  <Select>
                    <Select.Option key={0} value={0}>
                      非紧急
                    </Select.Option>
                    <Select.Option key={1} value={1}>
                      平急
                    </Select.Option>
                    <Select.Option key={1} value={1}>
                      加急
                    </Select.Option>
                    <Select.Option key={1} value={1}>
                      特急
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button onClick={() => {}}>重置</Button>
                <Button type="primary" style={{ marginLeft: 10 }}>
                  统计
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
      </Col>
      <Col span={7}>
        <Card style={{ width: '35%', height: '30vh' }}>
          <Button onClick={() => {}}>更 多 项</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default AddThreadForm;
