import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
const AddThreadForm = ({ form }) => {
  const formItems = [
    {
      label: '选择业务类型',
      name: 'reportProvince',
      span: 1,
    },
    {
      label: '时间范围',
      name: 'reportDate',
      type: 'date',
      span: 1,
    },
    {
      label: '来源',
      name: 'publicityMaterialsNumber',
      span: 1,
    },
    {
      label: '删除网络信息数量',
      name: 'networkInformationNumber',
      span: 1,
    },
    {
      label: '查办案件工程数量',
      name: 'investigationHandlingCaseNumber',
      span: 1,
    },
    {
      label: '非法出版数量',
      name: 'illegalPublicationNumber',
      span: 1,
    },
  ];
  return <AdvancedForm form={form} fields={formItems} />;
};
AddThreadForm.useForm = AdvancedForm.useForm;
export default AddThreadForm;
