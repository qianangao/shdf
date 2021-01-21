import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const DictionaryForm = ({ form }) => {
  const formItems = [
    {
      label: '字典代码',
      name: 'name',
      span: 4,
      rules: [{ required: true, message: '请输入字典名称!', whitespace: true }],
    },
    {
      label: '类型名称',
      name: 'chineseName',
      span: 4,
      rules: [{ max: 180, message: '请输入字段类型!', whitespace: true }],
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

DictionaryForm.useForm = AdvancedForm.useForm;

export default DictionaryForm;
