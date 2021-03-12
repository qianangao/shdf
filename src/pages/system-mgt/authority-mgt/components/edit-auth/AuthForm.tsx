import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const AuthForm = ({ form, visible = false }) => {
  const formItems = [
    {
      label: '上级资源',
      name: 'parentName',
      disabled: true,
      visible,
      span: 4,
    },
    {
      label: '资源名称',
      name: 'permessionName',
      span: 4,
      rules: [{ required: true, message: '请输入资源名称!' }],
    },
    {
      label: '资源权限',
      name: 'permessionResource',
      span: 4,
      rules: [{ required: true, message: '请输入资源权限!' }],
    },
    {
      label: '权限类型',
      name: 'permessionType',
      span: 4,
      rules: [{ required: true, message: '请输入资源权限!' }],
      enumsLabel: 'system_permession',
    },
    {
      label: '资源描述',
      name: 'permessionDesc',
      span: 4,
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

AuthForm.useForm = AdvancedForm.useForm;

export default AuthForm;
