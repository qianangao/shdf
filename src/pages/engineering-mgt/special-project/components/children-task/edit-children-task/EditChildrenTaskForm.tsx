import React from 'react';
import { Button, Card } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
// import FeedbackTable from './FeedbackTable';
import TaskProgressTable from '../TaskProgressTable';
import SummaryFeedbackTable from '../feedback/SummaryFeedbackTable';
import StageFeedbackTable from '../feedback/StageFeedbackTable';

const EditChildrenTaskForm = ({
  form,
  disabled,
  visible,
  // openFeedbackModal,
  openAddModal,
  feedbackDetailModal,
}) => {
  const checkStartDate = (rule, value, callback) => {
    const endValue = form.getFieldValue('endDate');
    if (endValue && endValue < value) {
      callback(new Error('开始日期应不晚于结束日期!'));
    } else {
      callback();
    }
  };
  const checkEndDate = (rule, value, callback) => {
    const startValue = form.getFieldValue('startDate');
    if (startValue && startValue > value) {
      callback(new Error('结束日期应不早于开始日期!'));
    } else {
      callback();
    }
  };
  const formItems = [
    // { label: 'id', name: 'bookId', hidden: true },
    {
      label: '任务名称',
      name: 'taskName',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请输入子任务名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '任务状态',
      name: 'taskState',
      span: 4,
      disabled,
      rules: [{ required: true, message: '请选择任务状态' }],
      enumsLabel: 'special_task_state',
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 4,
      disabled,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'object_secrecy_level',
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请选择开始日期' },
        {
          validator: checkStartDate,
        },
      ],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'endDate',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请选择截止日期!' },
        {
          validator: checkEndDate,
        },
      ],
      type: 'date',
    },
    {
      label: '年度',
      name: 'taskYear',
      span: 4,
      rules: [{ required: true, message: '请输入年度!' }],
    },
    {
      label: '任务描述',
      name: 'taskDescription',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请输入任务描述!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字!' },
      ],
      type: 'textarea',
    },
    {
      label: '阶段反馈要求',
      name: 'stageTaskFeedbackList',
      span: 4,
      render: <StageFeedbackTable disabled={disabled} visible={visible} />,
    },
    {
      label: '总结反馈要求',
      name: 'specialTaskFeedbackList',
      span: 4,
      disabled,
      render: <SummaryFeedbackTable disabled={disabled} visible={visible} />,
    },

    {
      label: '附件列表',
      name: 'fileIds',
      span: 4,
      disabled,
      type: 'uploadSecrecy',
    },
    {
      label: '任务进度',
      name: 'taskProgressList',
      span: 4,
      disabled,
      render: <TaskProgressTable feedbackDetailModal={feedbackDetailModal} />,
    },
  ];

  return (
    <Card
      title="任务信息"
      extra={
        <>
          {/* <Button
            type="primary"
            onClick={() => openFeedbackModal(taskId)}
            style={{ marginRight: 8 }}
          >
            任务反馈
          </Button> */}
          <Button type="primary" onClick={() => openAddModal({ visible: true })}>
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
