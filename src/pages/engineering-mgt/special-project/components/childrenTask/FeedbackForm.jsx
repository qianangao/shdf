import React from 'react';
// import { Button, Card } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
// import FeedbackTable from './FeedbackTable'
// import TaskProgressTable from './TaskProgressTable'

const FeedbackForm = ({ form }) => {
  const formItems = [
    // { label: 'id', name: 'bookId', hidden: true },
    {
      label: '任务名称',
      name: 'actionName',
      span: 2,
      rules: [
        { required: true, message: '请输入子任务名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '保密等级',
      name: 'level',
      span: 2,
      rules: [{ required: true, message: '请选择保密等级' }],
    },
    {
      label: '开始日期',
      name: 'start_date',
      span: 2,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'end_date',
      span: 2,
      rules: [{ required: true, message: '请选择截止日期!' }],
      type: 'date',
    },

    {
      label: '反馈要求',
      name: 'stageRequest',
      span: 4,
      //   render:(<Button onClick={()=>openFeedbackReqModal()}>选择反馈要求</Button>)
      //   render: <FeedbackTable/>
    },
    {
      label: '反馈信息',
      name: 'description',
      span: 4,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },
    {
      label: '附件列表',
      name: 'files',
      span: 4,
      type: 'upload',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

FeedbackForm.useForm = AdvancedForm.useForm;

export default FeedbackForm;
