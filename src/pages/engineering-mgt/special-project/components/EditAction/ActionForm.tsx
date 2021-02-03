import React from 'react';
import { Card, Button } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';

const ActionForm = ({ form, openAddSpecialModal }) => {
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
      name: 'segmentation',
      type: 'segmentation',
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
      label: '保密等级',
      name: 'level',
      span: 2,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'subject_secrecy_level',
    },
    {
      name: 'segmentation1',
      type: 'segmentation',
    },
    {
      name: 'segmentation2',
      type: 'segmentation',
    },
    {
      label: '总体描述',
      name: 'description',
      span: 4,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },
  ];

  return (
    <Card
      title="专项行动"
      extra={
        <Button type="primary" onClick={() => openAddSpecialModal()}>
          编辑
        </Button>
      }
      style={{ width: '100%', marginRight: 200 }}
    >
      <AdvancedForm form={form} fields={formItems} />
    </Card>
  );
};

ActionForm.useForm = AdvancedForm.useForm;

export default ActionForm;
