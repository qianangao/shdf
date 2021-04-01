import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const AddRoleForm = ({ form }) => {
  const formItems = [
    { label: 'id', name: 'userId', hidden: true },
    {
      label: '用户ID',
      name: 'userName',
      span: 1,
      rules: [
        { required: true, message: '请输入用户姓名!', whitespace: true },
        { max: 30, message: '姓名长度请小于30位!' },
      ],
    },
    {
      label: '角色id',
      name: 'userCode',
      span: 1,
      rules: [
        { required: true, message: '请输入用编码!', whitespace: true },
        { max: 30, message: '姓名长度请小于30位!' },
      ],
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

AddRoleForm.useForm = AdvancedForm.useForm;

export default AddRoleForm;
