import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const FieldForm = ({ form, dictData }) => {
  const formItems = [
    {
      name: 'dictId',
      hidden: true,
    },
    {
      label: '字典代码',
      name: 'dictCode',
      span: 4,
      rules: [{ required: true, message: '请输入字典名称!', whitespace: true }],
    },
    {
      label: '字典名称',
      name: 'dictName',
      span: 4,
      rules: [{ max: 180, message: '请输入字段名称!', whitespace: true }],
    },
    {
      label: '排序',
      name: 'dictSort',
      span: 4,
      rules: [{ max: 180, message: '请输入字段名称!', whitespace: true }],
    },
    {
      label: '备注',
      name: 'dictDesc',
      span: 4,
      rules: [{ max: 180, message: '请输入字段名称!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (dictData) {
      form.setFieldsValue(dictData);
    }
  }, [dictData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

FieldForm.useForm = AdvancedForm.useForm;

export default connect(({ smDictionaryMgt }) => ({
  roleData: smDictionaryMgt.roleData,
}))(FieldForm);
