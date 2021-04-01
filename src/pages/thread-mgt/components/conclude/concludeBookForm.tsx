import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Radio } from 'antd';

const concludeBookForm = ({ form }) => {
  const formItems = [
    {
      label: '意见',
      name: 'opinion',
      span: 4,
      rules: [
        { required: true, message: '请输入意见!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字!' },
      ],
      type: 'textarea',
    },
    {
      label: '转办提示',
      name: 'AdministrativePrompt',
      span: 4,
      rules: [{ required: true, message: '请选择办理方式!' }],
      render: (
        <Radio.Group>
          <Radio value="0">转办</Radio>
          <Radio value="1">退回原省份</Radio>
        </Radio.Group>
      ),
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

concludeBookForm.useForm = AdvancedForm.useForm;

export default concludeBookForm;
