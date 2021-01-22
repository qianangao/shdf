import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const InstitutionForm = ({ form }) => {
  const formItems = [
    { label: 'id', name: 'orgId', hidden: true },
    { label: '机构中文名', name: 'orgName' },
    { label: '机构英文名', name: 'orgNameEn' },
    { label: '机构代码', name: 'orgCode' },
    { label: '机构分类', name: 'category' },
    { label: '所在地区', name: 'area' },
    { label: '简介说明', name: 'description' },
    { label: '中文地址', name: 'address' },
    { label: '英文地址', name: 'addressEn' },
    { label: '联系人员', name: 'contacts' },
    { label: '联系电话', name: 'phone' },
    { label: '传真号码', name: 'fax' },
    { label: '电子邮件', name: 'email' },
    { label: '网站地址', name: 'website' },
    { label: '法定代表', name: 'legalPerson' },
    { label: '管理人员', name: 'management' },
    { label: '成立日期', name: 'establishDate', type: 'date' },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

InstitutionForm.useForm = AdvancedForm.useForm;

export default InstitutionForm;
