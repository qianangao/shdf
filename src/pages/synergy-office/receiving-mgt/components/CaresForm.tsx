import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const CaresForm = ({ form, caresFormData }) => {
  const formItems = [
    {
      label: '组织名称',
      name: 'mechanismName',
      span: 2,
      rules: [{ required: true, message: '请输入组织机构!', whitespace: true }],
    },
    {
      label: '联系人',
      name: 'contactPerson',
    },
    {
      label: '联系方式',
      name: 'contactInformation',
    },
    {
      label: '简介',
      name: 'introduction',
      type: 'textArea',
      span: 4,
    },
  ];

  useEffect(() => {
    form.setFieldsValue(caresFormData);
  }, [caresFormData]);

  return <AdvancedForm form={form} loading={false} fields={formItems} />;
};

CaresForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(CaresForm);
