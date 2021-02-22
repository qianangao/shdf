import React from 'react';

import AdvancedForm from '@/components/AdvancedForm';
// import FeedbackTable from './FeedbackTable'
// import TaskProgressTable from './TaskProgressTable'

const FeedbackDetailForm = ({ form }) => {
  const formItems = [
    {
      label: '反馈信息',
      name: 'feedbackContent',
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

FeedbackDetailForm.useForm = AdvancedForm.useForm;

export default FeedbackDetailForm;
