import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
// import { connect } from 'umi';

const TempProvinceForm = () => {
  const formItems = [
    {
      label: '省份',
      name: 'province',
      span: 2,
    },
    {
      label: '年份',
      name: 'year',
      span: 2,
    },
    {
      label: '联络人',
      name: 'people',
      span: 2,
    },
    {
      label: '联络电话',
      name: 'phone',
      span: 2,
    },
  ];
  return <AdvancedForm fields={formItems} />;
};

TempProvinceForm.useForm = AdvancedForm.useForm;

export default TempProvinceForm;
