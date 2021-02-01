import React from 'react';
import { Card, Button, Select } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';

const ActionForm = ({ form }) => {
  const formItems = [
    // { label: 'id', name: 'bookId', hidden: true },
    {
      label: '行动名称',
      name: 'actionName',
      span: 2,
      rules: [
        { required: true, message: '请输入行动名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '行动编号',
      name: 'actionId',
      span: 2,
      rules: [{ required: true, message: '请输入行动编号', whitespace: true }],
    },
    {
      label: '保密等级',
      name: 'level',
      span: 4,
      rules: [{ required: true, message: '请选择保密等级' }],
      render: (
        <Select>
          <Select.Option value={1} key="1">
            机密
          </Select.Option>
          <Select.Option value={2} key="2">
            秘密
          </Select.Option>
          <Select.Option value={3} key="3">
            普通
          </Select.Option>
        </Select>
      ),
    },
    {
      label: '开始日期',
      name: 'start_date',
      span: 2,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '结束日期',
      name: 'end_date',
      span: 2,
      rules: [{ required: true, message: '请选择结束日期!' }],
      type: 'date',
    },
    {
      label: '总体描述',
      name: 'description',
      span: 4,
      rules: [{ required: true, message: '请输入!' }],
      type: 'textarea',
    },
  ];

  return (
    <Card
      title="专项行动"
      extra={<Button type="primary">编辑</Button>}
      style={{ width: '100%', marginRight: 200 }}
    >
      <AdvancedForm form={form} fields={formItems} />
    </Card>
  );
};

ActionForm.useForm = AdvancedForm.useForm;

export default ActionForm;
