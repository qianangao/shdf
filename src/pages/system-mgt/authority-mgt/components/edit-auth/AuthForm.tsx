import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Select } from 'antd';

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
      render: (
        <Select>
          <Select.Option value="1">菜单</Select.Option>
          <Select.Option value="2">按钮</Select.Option>
          <Select.Option value="3">接口</Select.Option>
        </Select>
      ),
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
