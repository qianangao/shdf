import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const DictionaryForm = ({ form, orgInfoData }) => {
  const formItems = [
    {
      name: 'dictTypeId',
      hidden: true,
    },
    {
      label: '类型编码',
      name: 'dictTypeCode',
      span: 4,
      rules: [{ required: true, message: '请输入字典代码!', whitespace: true }],
    },
    {
      label: '类型名称',
      name: 'dictTypeName',
      span: 4,
      rules: [{ required: true, message: '请输入类型名称!', whitespace: true }],
    },
    {
      label: '备注',
      name: 'dictTypeDesc',
      span: 4,
      rules: [{ max: 180, message: '请输入备注!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (orgInfoData) {
      form.setFieldsValue({ ...orgInfoData });
    }
  }, [orgInfoData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

DictionaryForm.useForm = AdvancedForm.useForm;

export default DictionaryForm;
