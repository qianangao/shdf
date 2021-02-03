import React from 'react';
import { Button, Card } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import FeedbackTable from './FeedbackTable';
import TaskProgressTable from './TaskProgressTable';

const EditChildrenTaskForm = ({ form, disabled, openFeedbackModal, openAddModal }) => {
  const formItems = [
    // { label: 'id', name: 'bookId', hidden: true },
    {
      label: '任务名称',
      name: 'actionName',
      span: 2,
      disabled,
      rules: [
        { required: true, message: '请输入子任务名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      name: 'segmentation',
      type: 'segmentation',
    },
    {
      label: '任务状态',
      name: 'level',
      span: 2,
      disabled,
      rules: [{ required: true, message: '请选择任务状态' }],
    },
    {
      label: '保密等级',
      name: 'level',
      span: 2,
      disabled,
      rules: [{ required: true, message: '请选择保密等级' }],
    },
    {
      label: '开始日期',
      name: 'start_date',
      span: 2,
      disabled,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'end_date',
      span: 2,
      disabled,
      rules: [{ required: true, message: '请选择截止日期!' }],
      type: 'date',
    },
    {
      label: '任务描述',
      name: 'description',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },
    {
      label: '反馈要求',
      name: 'stageRequest',
      span: 4,
      disabled,
      render: <FeedbackTable />,
    },
    {
      label: '附件列表',
      name: 'files',
      span: 4,
      disabled,
      type: 'upload',
    },
    {
      label: '任务进度',
      name: 'stageRequest',
      span: 4,
      disabled,
      render: <TaskProgressTable />,
    },
  ];

  return (
    <Card
      title="任务信息"
      extra={
        <>
          <Button type="primary" onClick={() => openFeedbackModal()} style={{ marginRight: 8 }}>
            任务反馈
          </Button>
          <Button type="primary" onClick={() => openAddModal()}>
            新增子任务
          </Button>
        </>
      }
      style={{ width: '100%', marginRight: 200 }}
    >
      <AdvancedForm form={form} fields={formItems} />
    </Card>
  );
};

EditChildrenTaskForm.useForm = AdvancedForm.useForm;

export default EditChildrenTaskForm;
