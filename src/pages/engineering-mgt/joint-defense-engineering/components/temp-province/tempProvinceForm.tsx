import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
// import { connect } from 'umi';
// import { checkPhone } from '@/utils/validators';

const TempProvinceForm = ({ form }) => {
  const formItems = [
    {
      label: '省份',
      name: 'provinceCode',
      span: 2,
    },
    {
      label: '年份',
      name: 'year',
      span: 2,
    },
    {
      label: '联络人',
      name: 'contacts',
      span: 2,
    },
    {
      label: '联络电话',
      name: 'contactPhone',
      span: 2,
      // rules: [
      //   { required: true, message: '请输入联络电话!' },
      //   {
      //     validator: checkPhone,
      //   },
      // ],
    },
  ];
  return <AdvancedForm form={form} fields={formItems} />;
};

TempProvinceForm.useForm = AdvancedForm.useForm;

export default TempProvinceForm;
