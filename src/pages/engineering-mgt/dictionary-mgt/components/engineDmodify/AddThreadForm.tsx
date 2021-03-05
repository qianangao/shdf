import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const AddThreadForm = ({ form }) => {
  const formItems = [
    {
      label: '上报省份',
      name: 'reportProvince',
      span: 4,
      rules: [{ required: true, message: '请输入上报省份!' }],
    },
    {
      label: '上报时间',
      name: 'reportDate',
      type: 'date',
      span: 4,
    },
    {
      label: '宣传物品数量',
      name: 'publicityMaterialsNumber',
      span: 4,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入宣传物品数量!(数字)',
        },
      ],
    },
    {
      label: '删除网络信息数量',
      name: 'networkInformationNumber',
      span: 4,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入删除网络信息数量!(数字)',
        },
      ],
    },
    {
      label: '查办案件工程数量',
      name: 'investigationHandlingCaseNumber',
      span: 4,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入查办案件工程数量数量!(数字)',
        },
      ],
    },
    {
      label: '非法出版数量',
      name: 'illegalPublicationNumber',
      span: 4,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入非法出版数量!(数字)',
        },
      ],
    },
  ];
  return <AdvancedForm form={form} fields={formItems} />;
};
AddThreadForm.useForm = AdvancedForm.useForm;
export default AddThreadForm;
