import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Radio } from 'antd';

const DetailInfoForm = ({ form }) => {
  const formItems = [
    {
      label: '审核人',
      name: 'auditUser',
      span: 2,
      initialValue: 'user',
      disabled: true,
    },
    {
      label: '审核状态',
      name: 'auditResult',
      rules: [{ required: true, message: '请选择审核状态!' }],
      render: (
        <Radio.Group>
          <Radio value={0}>通过</Radio>
          <Radio value={1}>不通过</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '审核意见',
      name: 'auditOpinion',
      span: 4,
      type: 'textarea',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

DetailInfoForm.useForm = AdvancedForm.useForm;

export default DetailInfoForm;
