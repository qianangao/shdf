import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
// import { connect } from 'umi';

const TempProvinceForm = () => {
  const formItems = [
    {
      label: '工程名称',
      name: 'enginerringName',
      span: 2,
      rules: [
        { required: true, message: '请输入工程名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
  ];
  return <AdvancedForm form={form} fields={formItems} />;
};

TempProvinceForm.useForm = AdvancedForm.useForm;

export default TempProvinceForm;
