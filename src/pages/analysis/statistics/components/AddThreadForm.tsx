import React from 'react';

import { Button, Card, Col, Form, Input, List, Modal, Row, Select, Spin } from 'antd';
const AddThreadForm = ({}) => {
  const [form] = Form.useForm();
  return (
    <Row justify="space-between">
      <Col span={17}>
        <Form form={form}>
          <Card>
            <Row justify="space-between">
              <Col span={8}>
                <Form.Item label="选择业务类型" name="readingAccount">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10} style={{ paddingLeft: 20 }}></Col>
              <Col span={10} style={{ paddingLeft: 20 }}>
                <Form.Item label="处理状态" name="readingState">
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
              <Col span={8} style={{ paddingLeft: 20 }}>
                <Form.Item label="来源" name="readingState">
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
              <Col span={8} style={{ paddingLeft: 20 }}>
                <Form.Item label="办理状态" name="readingState">
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
              <Col span={8} style={{ paddingLeft: 20 }}>
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
              <Col span={8} style={{ paddingLeft: 20 }}>
                <Form.Item label="重要程度" name="readingState">
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
              <Col span={8} style={{ paddingLeft: 20 }}>
                <Form.Item label="紧急程度" name="readingState">
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
              <Col span={8} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button onClick={() => {}}>重置</Button>
                <Button type="primary" style={{ marginLeft: 10 }} onClick={() => {}}>
                  统计
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
      </Col>
      <Col span={7}>
        <Card>
          <Button onClick={() => {}}>更多项</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default AddThreadForm;
