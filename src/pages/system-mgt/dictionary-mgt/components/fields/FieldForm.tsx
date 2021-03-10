import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const FieldForm = ({ form, data, id }) => {
  const formItems = [
    {
      name: 'dictId',
      hidden: true,
    },
    {
      name: 'dictTypeId',
      hidden: true,
    },
    {
      label: '字典代码',
      name: 'dictTypeCode',
      disabled: !!id,
      span: 4,
      rules: [{ required: true, message: '请输入字典名称!', whitespace: true }],
    },
    {
      label: '类型名称',
      name: 'dictTypeName',
      visible: !!id,
      disabled: true,
      span: 4,
      rules: [{ max: 180, message: '请输入字段类型!', whitespace: true }],
    },
    {
      label: '字典名称',
      name: 'dictName',
      span: 4,
      rules: [{ max: 180, message: '请输入字段名称!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  return <AdvancedForm form={form} fields={formItems} />;
};

FieldForm.useForm = AdvancedForm.useForm;

export default connect(({ smDictionaryMgt }) => ({
  roleData: smDictionaryMgt.roleData,
}))(FieldForm);
