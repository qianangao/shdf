import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const FeedbackDetailForm = ({ form }) => {
  const formItems = [
    {
      label: '反馈信息',
      name: 'feedbackContent',
      span: 4,
      type: 'textarea',
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

FeedbackDetailForm.useForm = AdvancedForm.useForm;

export default FeedbackDetailForm;
