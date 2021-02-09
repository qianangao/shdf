import React, { useRef } from 'react';
// import { Select, Button } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
// import FeedbackTable from './FeedbackTable';
import SummaryFeedbackTable from './SummaryFeedbackTable';

const ChildrenTaskForm = ({ form, visible }) => {
  const feedRef = useRef();
  const formItems = [
    // { label: 'id', name: 'bookId', hidden: true },
    {
      label: '子任务名称',
      name: 'taskName',
      span: 2,
      rules: [
        { required: true, message: '请输入子任务名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 2,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'subject_secrecy_level',
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 2,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'endDate',
      span: 2,
      rules: [{ required: true, message: '请选择截止日期!' }],
      type: 'date',
    },
    {
      label: '任务描述',
      name: 'taskDescription',
      span: 4,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },
    {
      label: '阶段反馈要求',
      name: 'specialTaskFeedbackList',
      span: 4,
      render: <SummaryFeedbackTable visible={visible} />,
    },
    {
      label: '总结反馈要求',
      name: 'totalRequest',
      span: 4,
      // rules: [{ required: true, message: '请输入!' }],
      render: <SummaryFeedbackTable visible={visible} ref={feedRef} />,
    },
    {
      label: '附件列表',
      name: 'fileIds',
      span: 4,
      type: 'upload',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

ChildrenTaskForm.useForm = AdvancedForm.useForm;

export default ChildrenTaskForm;
