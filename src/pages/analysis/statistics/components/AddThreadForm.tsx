import React from 'react';
import BarStacked from '@/components/Charts/BarStacked/index';
import { Button, Card, Col, Form, DatePicker, Row, Select } from 'antd';
import { connect } from 'umi';

const { RangePicker } = DatePicker;
const AddThreadForm = ({ dispatch }) => {
  const [form] = Form.useForm();
  const getTreeData = () => {};
  const onFinish = () => {
    getTreeData();
  };

  const handleSearch = () => {};
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Row justify="space-between">
      <Col span={17}>
        <Form form={form} onFinish={onFinish} {...formItemLayout} onSubmit={handleSearch}>
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
              <Col span={10} />
              <Col span={10}>
                <Form.Item label="时间范围" name="handleState">
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="来源" name="source">
                  <Select>
                    <Select.Option key={12311} value={0}>
                      网络
                    </Select.Option>
                    <Select.Option key={1213} value={1}>
                      信函
                    </Select.Option>
                    <Select.Option key={1321} value={1}>
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
                  {/* <TreeSelect
                    multiple
                    style={{ width: '100%' }}
                    placeholder="请选择"
                    treeNodeLabelProp="orgNameStr"
                  >
                    {renderTreeNodes()}
                  </TreeSelect> */}
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
                    <Select.Option key={32131} value={0}>
                      非紧急
                    </Select.Option>
                    <Select.Option key={132131} value={1}>
                      平急
                    </Select.Option>
                    <Select.Option key={13131} value={1}>
                      加急
                    </Select.Option>
                    <Select.Option key={1313131} value={1}>
                      特急
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button onClick={() => {}}>重置</Button>
                <Button type="primary" style={{ marginLeft: 10 }} htmlType="submit">
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
      <BarStacked dispatch={dispatch} />
    </Row>
  );
};

export default connect(({ statistical }) => ({
  statistical,
}))(AddThreadForm);
