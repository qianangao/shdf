import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const InstitutionForm = ({ form }) => {
  const formItems = [
    { label: 'id', name: 'orgId', hidden: true },
    {
      label: '中文名称',
      name: 'orgName',
      rules: [{ required: true, message: '请输入中文名称!' }],
    },
    {
      label: '英文名称',
      name: 'orgNameEn',
      rules: [{ required: true, message: '请输入英文名称!' }],
    },
    {
      label: '机构类别',
      name: 'category',
    },
    {
      label: '所在地区',
      name: 'area',
      // enumsLabel: 'dict_sex',
    },
    {
      label: '中文地址',
      name: 'address',
    },
    {
      label: '英文地址',
      name: 'addressEn',
    },
    {
      label: '机构代码',
      name: 'code',
    },
    {
      label: '联系人员',
      name: 'contacts',
    },
    {
      label: '联系电话',
      name: 'phone',
    },
    {
      label: '传真号码',
      name: 'fax',
    },
    {
      label: '电子邮件',
      name: 'email',
    },
    {
      label: '网站地址',
      name: 'website',
    },
    {
      label: '法定代表',
      name: 'legalPerson',
    },
    {
      label: '管理人员',
      name: 'management',
    },
    {
      label: '成立时间',
      name: 'establishDate',
      type: 'date',
    },
    {
      label: '简介说明',
      name: 'description',
      type: 'textarea',
    },
    {
      label: '备注说明',
      name: 'remarks',
      type: 'textarea',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

InstitutionForm.useForm = AdvancedForm.useForm;

export default InstitutionForm;
